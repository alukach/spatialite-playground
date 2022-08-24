# SQLite Playground

## Setup


Load an example NDJSON file into a sqlite datase:

```sh
cat data.ndjs | jq -c 'with_entries(select([.key] | inside(["id", "collection", "datetime"])))' |
npx -p @ndjson-utils/sqlite to-sql -t items -f example.sqlite -pk id
```

Prepare a database:

```
sqlite3 example.sqlite "CREATE INDEX IF NOT EXISTS datetime ON items(datetime); vacuum"
```
