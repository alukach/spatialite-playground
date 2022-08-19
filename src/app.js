import { createDbWorker } from "sql.js-httpvfs";

import sqlWorkerUrl from "url:sql.js-httpvfs/dist/sqlite.worker.js";
// import sqlWasmUrl from "url:sql.js-httpvfs/dist/sql-wasm.wasm";
import sqlWasmUrl from "url:sql.js-httpvfs/dist/sql-wasm.wasm";
import dbUrl from "url:../stac.sqlite";

// the config is either the url to the create_db script, or a inline configuration:
const config = {
  from: "inline",
  config: {
    serverMode: "full", // file is just a plain old full sqlite database
    requestChunkSize: 4096, // the page size of the  sqlite database (by default 4096)
    url: dbUrl, // url to the database (relative or full)
  },
};

function buildRecords({ columns, values }) {
  return values.map((value) =>
    Object.fromEntries(value.map((v, i) => [columns[i], v]))
  );
}

let maxBytesToRead = 10 * 1024 * 1024;
createDbWorker(
  [config],
  sqlWorkerUrl,
  sqlWasmUrl,
  maxBytesToRead // optional, defaults to Infinity
).then(async (worker) => {
  const rows = await worker.db.exec(
    `SELECT id FROM items WHERE datetime >= '2021-12-12T00:00:00Z' AND datetime < '2021-12-12T01:00:00Z';`
  );
  const records = buildRecords(rows.pop());
  console.log(records);

  // worker.worker.bytesRead is a Promise for the number of bytes read by the worker.
  // if a request would cause it to exceed maxBytesToRead, that request will throw a SQLite disk I/O error.
  console.log(await worker.worker.bytesRead);

  // you can reset bytesRead by assigning to it:
  worker.worker.bytesRead = 0;
});
