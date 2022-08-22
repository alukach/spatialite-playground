import { useEffect, useState } from "react";

const defaultQuery = `
  SELECT
      name,
      AsGeoJSON(geometry)
  FROM
      pois_polygon
  WHERE
      MBRIntersects(
          BuildMBR(575800, 244739, 575902, 244647),
          geometry
      )
  LIMIT
    10
`.trim();

export function QueryInput({ onSubmit, className }) {
  const [query, setQuery] = useState(defaultQuery);

  // Submit query on startup
  useEffect(() => {
    onSubmit(query);
  }, []);

  // Listen for CMD+Enter
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.metaKey && e.which === 13) {
        onSubmit(query);
      }
    };

    document
      .getElementById("query-input")
      .addEventListener("keydown", onKeyDown);

    return () => {
      document
        .getElementById("query-input")
        .removeEventListener("keydown", onKeyDown);
    };
  }, [query]);

  return (
    <div className={`d-grid ${className}`}>
      <label htmlFor="query-input">Query</label>
      <textarea
        id="query-input"
        className="form-control font-monospace"
        style={{ minWidth: "100%" }}
        rows={10}
        cols={40}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        data-gramm="false" // Disable grammarly
      ></textarea>

      <button
        className="btn btn-primary btn-sm btn-block"
        onClick={(e) => onSubmit(query)}
        title="⌘+Enter"
      >
        Submit{" "}
        <em>
          <kbd>⌘</kbd>+<kbd>Enter</kbd>
        </em>
      </button>
    </div>
  );
}
