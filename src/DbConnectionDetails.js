import { useEffect, useState } from "react";
import defaultDbUrl from "url:../stac.sqlite";
import defaultSpatialDbUrl from "url:../db_large.sqlite";

export const DbConnectionDetails = ({ onSubmit }) => {
  const [dbUrl, setDbUrl] = useState(defaultDbUrl);
  const [requestChunkSize, setRequestChunkSize] = useState(4096);

  const submitDetails = () => {
    onSubmit({
      from: "inline",
      config: {
        serverMode: "full", // file is just a plain old full sqlite database
        requestChunkSize: requestChunkSize, // the page size of the  sqlite database (by default 4096)
        url: dbUrl, // url to the database (relative or full)
      },
    });
  };

  useEffect(() => {
    submitDetails();
  }, []);

  return (
    <details>
      <summary>SQLite Connection Parameters</summary>
      <label htmlFor="dburl-input">SQLite Database URL</label>
      <input
        id="dburl-input"
        value={dbUrl}
        onChange={(e) => setDbUrl(e.target.value)}
        style={{ minWidth: "100%" }}
      />
      <label htmlFor="chunksize-input">Request Chunk Size</label>
      <input
        id="chunksize-input"
        type="number"
        value={requestChunkSize}
        onChange={(e) => setRequestChunkSize(e.target.value)}
        style={{ minWidth: "100%" }}
      />
      <button onClick={submitDetails}>Save</button>
    </details>
  );
};
