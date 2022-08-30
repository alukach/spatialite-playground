import { useEffect, useState } from "react";

const stacUrlQueryParamKey = "stac";
const dbUrlQueryParamKey = "db";
const initialSearchParams = new URL(window.location).searchParams;

export const DbConnectionDetails = ({ onSubmit, initialParams }) => {
  const [stacUrl, setStacUrl] = useState(
    initialSearchParams.get(stacUrlQueryParamKey) || initialParams.stacUrl
  );
  const [dbUrl, setDbUrl] = useState(
    initialSearchParams.get(dbUrlQueryParamKey) || initialParams.dbUrl
  );

  const submitDetails = () => {
    onSubmit({ dbUrl, stacUrl });

    // Set URL to reflect db URL
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set(dbUrlQueryParamKey, dbUrl);
    queryParams.set(stacUrlQueryParamKey, stacUrl);
    history.replaceState(null, null, `?${queryParams}`);
  };

  useEffect(submitDetails, []);

  return (
    <details>
      <summary>SQLite Connection Parameters</summary>
      <div className="form-floating">
        <input
          id="dburl-input"
          className="form-control font-monospace"
          value={dbUrl}
          onChange={(e) => setDbUrl(e.target.value)}
        />
        <label className="form-label" htmlFor="dburl-input">
          SQLite Database URL
        </label>
      </div>
      <div className="form-floating">
        <input
          id="stacurl-input"
          className="form-control font-monospace"
          value={stacUrl}
          onChange={(e) => setStacUrl(e.target.value)}
        />
        <label className="form-label" htmlFor="stacurl-input">
          STAC URL
        </label>
      </div>

      <button className="btn btn-secondary btn-sm" onClick={submitDetails}>
        Save
      </button>
    </details>
  );
};
