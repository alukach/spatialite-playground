export function ResultsTable({ records, className, stacUrl }) {
  const keys = records.length ? Object.keys(records[0]) : [];

  return (
    <table className={className}>
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
            {keys.map((key) => {
              const val = record[key];
              return (
                <td key={key}>
                  {key === "id" && "id" in record && "collection" in record ? (
                    <a
                      href={`${stacUrl}/collections/${record["collection"]}/items/${record["id"]}`}
                      target="_blank"
                    >
                      <code>{val}</code>
                    </a>
                  ) : (
                    <code>
                      {["string", "number"].includes(typeof val)
                        ? val
                        : JSON.stringify(val)}
                    </code>
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
