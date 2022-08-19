export function ResultsTable({ records }) {
  const keys = Object.keys(records[0]);

  return (
    <table>
      <thead>
        <tr>
          {keys.map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {records.map((record, i) => (
          <tr key={i}>
            {keys.map((key) => (
              <td key={key}>
                <code>{record[key]}</code>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
