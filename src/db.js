import { useEffect, useState } from "react";

import { createDbWorker } from "sql.js-httpvfs";

import sqlWorkerUrl from "url:sql.js-httpvfs/dist/sqlite.worker.js";
import sqlWasmUrl from "url:sql.js-httpvfs/dist/sql-wasm.wasm";
import dbUrl from "url:../stac.sqlite";

const dbConfig = {
  from: "inline",
  config: {
    serverMode: "full", // file is just a plain old full sqlite database
    requestChunkSize: 4096, // the page size of the  sqlite database (by default 4096)
    url: dbUrl, // url to the database (relative or full)
  },
};
let maxBytesToRead = 10 * 1024 * 1024; // optional, defaults to Infinity

export function useQuery(query) {
  // Build Worker
  const [worker, setWorker] = useState();
  useEffect(() => {
    createDbWorker([dbConfig], sqlWorkerUrl, sqlWasmUrl, maxBytesToRead).then(
      (worker) => {
        setWorker(worker);
      }
    );
  }, []);

  // Run Query
  const [records, setRecords] = useState();
  useEffect(() => {
    if (!worker) return;
    console.log(`Running query ${query}`);
    worker.db.exec(query).then(async (rows) => {
      setRecords(buildRecords(rows.pop()));

      // worker.worker.bytesRead is a Promise for the number of bytes read by the worker.
      // if a request would cause it to exceed maxBytesToRead, that request will throw a SQLite disk I/O error.
      console.log(await worker.worker.bytesRead);

      // you can reset bytesRead by assigning to it:
      worker.worker.bytesRead = 0;
    });
  }, [query, worker]);

  return records;
}

function buildRecords({ columns, values }) {
  return values.map((value) =>
    Object.fromEntries(value.map((v, i) => [columns[i], v]))
  );
}
