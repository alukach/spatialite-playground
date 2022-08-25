import Map, { Source, Layer } from "react-map-gl";
import { useMemo } from "react";

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;

const fillStyle = {
  type: "fill",
  source: "records",
  paint: {
    "fill-color": "red",
    "fill-opacity": 0.65,
  },
};

export const ResultsMap = ({ records }) => {
  const geojson = useMemo(
    () => ({
      type: "FeatureCollection",
      features: records.map((rec) => ({
        type: "Feature",
        geometry: rec.geometry,
        properties: {},
      })),
    }),
    [records]
  );

  return (
    <Map
      initialViewState={{
        latitude: 40,
        longitude: -100,
        zoom: 1,
      }}
      mapStyle="mapbox://styles/mapbox/light-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      <Source type="geojson" data={geojson}>
        <Layer
          id="fill"
          type="fill"
          source="records"
          paint={{
            "fill-color": "red",
            "fill-opacity": 0.35,
          }}
        />
        <Layer
          id="outline"
          type="line"
          source="records"
          paint={{
            "line-color": "#333",
            "line-opacity": 0.65,
          }}
        />
      </Source>
    </Map>
  );
};
