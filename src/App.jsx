import { useState } from "react";
import { useQuery } from "./db-query";
import { DbConnectionDetails } from "./DbConnectionDetails";
import { QueryInput } from "./QueryInput";
import { ResultsTable } from "./ResultsTable";
import { ResultsMap } from "./ResultsMap";

export function App() {
  const [dbUrl, setDbUrl] = useState();
  const [query, setQuery] = useState();
  const [records, message] = useQuery(query, dbUrl);

  return (
    <div className="container">
      <DbConnectionDetails onSubmit={setDbUrl} />
      <QueryInput onSubmit={setQuery} className="my-2" />
      <code>{message}</code>
      {records && records.length && records[0].hasOwnProperty("geometry") && (
        <ResultsMap records={records} />
      )}
      {records && (
        <ResultsTable
          records={records}
          className="table table-hover table-striped mt-2"
        />
      )}
    </div>
  );
}
