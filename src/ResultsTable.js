export function ResultsTable({ records }) {
  const keys = Object.keys(records[0]);

  return (
    <table>
      <thead>
        {keys.map((key) => (
          <th key={key}>{key}</th>
        ))}
      </thead>
      <tbody>
        {records.map((record) => (
          <tr>
            {keys.map((key) => (
              <td key={key}>{record[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
