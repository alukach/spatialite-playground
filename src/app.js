import { useState } from "react";
import { useQuery } from "./db-query";
import { DbConnectionDetails } from "./DbConnectionDetails";
import { QueryInput } from "./QueryInput";
import { ResultsTable } from "./ResultsTable";

export function App() {
  const [dbConnParams, setDbConnParams] = useState();
  const [query, setQuery] = useState();
  const [records, message] = useQuery(query, dbConnParams);
  
  return (
    <div className="container">
      <DbConnectionDetails onSubmit={setDbConnParams} />
      <QueryInput onSubmit={setQuery} className="my-2" />
      <code>{message}</code>
      {records && (
        <ResultsTable
          records={records}
          className="table table-hover table-striped mt-2"
        />
      )}
    </div>
  );
}
