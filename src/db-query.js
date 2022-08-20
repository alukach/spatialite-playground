import { useEffect, useState } from "react";

import { createDbWorker } from "sql.js-httpvfs";

import sqlWorkerUrl from "url:sql.js-httpvfs/dist/sqlite.worker.js";
import sqlWasmUrl from "url:sql.js-httpvfs/dist/sql-wasm.wasm";

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
  
  // Build Worker
  useEffect(() => {
    if (!dbConfig) return;
    setRecords(undefined);
    setMessage("Connecting to database...");
    createDbWorker([dbConfig], sqlWorkerUrl, sqlWasmUrl, maxBytesToRead)
      .then((worker) => {
        setWorker(worker);
      })
      .catch((e) => {
        console.error(e);
        setMessage(`Failed to setup DB: ${e}`);
      });
  }, [JSON.stringify(dbConfig)]);

  // Run Query
  useEffect(() => {
    if (!worker) return;
    setRecords(undefined);
    setMessage("Running query...");
    console.log(`Running query ${query}`);
    worker.db.exec(query).then(async (rows) => {
      const row = rows.pop();
      if (!row) return setRecords(undefined);
      setRecords(buildRecords(row));

      // worker.worker.bytesRead is a Promise for the number of bytes read by the worker.
      // if a request would cause it to exceed maxBytesToRead, that request will throw a SQLite disk I/O error.
      setMessage(`${await worker.worker.bytesRead} bytes read.`);

      // you can reset bytesRead by assigning to it:
      // worker.worker.bytesRead = 0;
    });
  }, [query, worker]);

  return [records, message];
}

function buildRecords({ columns, values }) {
  return values.map((value) =>
    Object.fromEntries(value.map((v, i) => [columns[i], v]))
  );
}
