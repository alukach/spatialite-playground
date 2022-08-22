import { useEffect, useState } from "react";

import SPL from "spl.js";
import { createDbWorker } from "sql.js-httpvfs";

import sqlWorkerUrl from "url:sql.js-httpvfs/dist/sqlite.worker.js";
// import sqlWasmUrl from "url:sql.js-httpvfs/dist/sql-wasm.wasm";
import sqlWasmUrl from "url:spl.js/dist/spl.wasm";

let maxBytesToRead = 10 * 1024 * 1024; // optional, defaults to Infinity

/**
 *
 * @param {string} query
 * @returns
 */
export function useQuery(query, dbConfig) {
  const [worker, setWorker] = useState();
  const [records, setRecords] = useState();
  const [message, setMessage] = useState("Preparing system...");
  console.log(dbConfig);

  // Build Worker
  useEffect(() => {
    if (!dbConfig) return;
    SPL()
      .then((spl) =>
        spl
          .mount("data", [
            {
              name: "london_boroughs",
              data: dbConfig.config.url,
            },
          ])
          .db()
      )
      .then(setWorker);
  }, [JSON.stringify(dbConfig)]);

  // Run Query
  useEffect(() => {
    if (!worker) return;
    setRecords(undefined);
    setMessage("Running query...");
    console.log(`Running query ${query}`);
    worker
      .exec(query)
      .get.first.then((record) => {
        console.log({ record });
        setRecords(record);
      })
      .catch((e) => {
        console.error(e);
        setMessage(e);
      });
  }, [query, worker]);

  return [records, message];
}

function buildRecords({ columns, values }) {
  return values.map((value) =>
    Object.fromEntries(value.map((v, i) => [columns[i], v]))
  );
}
