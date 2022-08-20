# SQLite Playground

## Setup

```sh
cat smallsats_items_2021-12-01.ndjs | jq -c 'with_entries(select([.key] | inside(["id", "collection", "datetime"])))' |
npx -p @ndjson-utils/sqlite to-sql -t items -f stac.sqlite -pk id
```

```
sqlite3 stac.sqlite "CREATE INDEX IF NOT EXISTS datetime ON items(datetime); vacuum"
```
