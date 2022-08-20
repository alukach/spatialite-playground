const stacUrl = "https://csdap.earthdata.nasa.gov/pgstac";

export function ResultsTable({ records, className }) {
  const keys = Object.keys(records[0]);

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
            {keys.map((key) => (
              <td key={key}>
                {key === "id" && "id" in record && "collection" in record ? (
                  <a
                    href={`${stacUrl}/collections/${record["collection"]}/items/${record["id"]}`}
                    target="_blank"
                  >
                    <code>{record[key]}</code>
                  </a>
                ) : (
                  <code>{record[key]}</code>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
