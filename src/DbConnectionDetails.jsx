import { useEffect, useState } from "react";

const dbUrlQueryParamKey = "db";

const defaultDbUrl = process.env.STAC_URL;

export const DbConnectionDetails = ({ onSubmit }) => {
  const [dbUrl, setDbUrl] = useState(
    new URL(window.location).searchParams.get(dbUrlQueryParamKey) ||
      defaultDbUrl
  );

  const submitDetails = () => {
    onSubmit(dbUrl);

    // Set URL to reflect db URL
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set(dbUrlQueryParamKey, dbUrl);
    history.replaceState(null, null, `?${queryParams}`);
  };

  useEffect(() => {
    submitDetails();
  }, []);

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

      <button className="btn btn-secondary btn-sm" onClick={submitDetails}>
        Save
      </button>
    </details>
  );
};
