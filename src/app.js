import { useState } from "react";
import { useQuery } from "./db";
import { ResultsTable } from "./ResultsTable";

const initialQuery = `
SELECT 
  id,
  datetime
FROM 
  items 
WHERE 
  datetime >= '2021-12-12T00:00:00Z' 
  AND 
  datetime < '2021-12-12T01:00:00Z' 
;
`.trim();

export function App() {
  const [finalQuery, setFinalQuery] = useState(initialQuery);

  const [query, setQuery] = useState(finalQuery);
  const records = useQuery(finalQuery);
  return (
    <div>
      <textarea
        rows={20}
        cols={40}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      ></textarea>

      <button onClick={() => setFinalQuery(query)}>Submit</button>
      {records ? <ResultsTable records={records} /> : <code>Loading...</code>}
    </div>
  );
}
