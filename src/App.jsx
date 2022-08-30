import { useState } from "react";
import { useQuery } from "./db-query";
import { DbConnectionDetails } from "./DbConnectionDetails";
import { QueryInput } from "./QueryInput";
import { ResultsTable } from "./ResultsTable";
import { ResultsMap } from "./ResultsMap";

export function App() {
  const [params, setParams] = useState({
    dbUrl: process.env.STAC_URL,
    stacUrl: process.env.DB_URL,
  });
  const [query, setQuery] = useState();
  const [records, message] = useQuery(query, params.dbUrl);

  return (
    <div className="container">
      <DbConnectionDetails onSubmit={setParams} initialParams={params} />
      <QueryInput onSubmit={setQuery} className="my-2" />
      <code>{message}</code>
      {records && records.length && records[0].hasOwnProperty("geometry") && (
        <ResultsMap records={records} />
      )}
      {records && (
        <ResultsTable
          records={records}
          stacUrl={params.stacUrl}
          className="table table-hover table-striped mt-2"
        />
      )}
    </div>
  );
}
