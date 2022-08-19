import { useQuery } from "./db";
import { ResultsTable } from "./ResultsTable";

export function App() {
  const query = `
    SELECT 
      id,
      datetime
    FROM 
      items 
    WHERE 
      datetime >= '2021-12-12T00:00:00Z' 
      AND 
      datetime < '2021-12-12T01:00:00Z' 
    ;`;

  const records = useQuery(query);
  if (records !== undefined) {
    return <ResultsTable records={records} />;
  }
  return <h1>Loading...</h1>;
}
