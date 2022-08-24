import { useEffect, useState } from "react";

import SPL from "spl.js";

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
    SPL()
      .then(async (spl) =>
        spl
          .mount("db", [
            {
              name: "data",
              data: dbConfig.config.url,
            },
          ])
          .db("file:db/data?immutable=1")
      )
      .then(setWorker)
      .catch((e) => {
        setMessage(`Failed to setup DB: ${e}`);
        throw e;
      });
  }, [JSON.stringify(dbConfig)]);

  // Run Query
  useEffect(() => {
    if (!worker) return;
    setRecords(undefined);
    setMessage("Running query...");
    console.log(`Running query ${query}`);
    worker
      .exec(query)
      .get.objs.then((records) => {
        console.log({ records });
        return records;
      })
      .then(setRecords)
      .catch((e) => {
        console.error(e);
        setMessage(e);
      });
  }, [query, worker]);

  return [records, message];
}
