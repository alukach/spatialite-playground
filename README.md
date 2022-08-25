# SQLite Playground

## Setup

Load an example NDJSON file into a sqlite database:

```sh
zcat < many-stac-items.ndjs.gz | geojson-to-sqlite spatial.sqlite items - --nl --pk=id --spatialite --spatial-index --alter
```

Index commonly searched properties:

```sh
sqlite3 -cmd "
    CREATE INDEX IF NOT EXISTS idx_datetime ON items(datetime); 
    CREATE INDEX IF NOT EXISTS idx_collection ON items(collection); 
    vacuum;
" spatial.sqlite
```
