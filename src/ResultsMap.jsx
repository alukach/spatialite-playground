import { Map, Source, Layer } from "react-map-gl";
import { useMemo, useRef, useCallback, useState } from "react";
import { LngLatBounds } from "mapbox-gl";

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;

export const ResultsMap = ({ records }) => {
  const [bounds, setBounds] = useState();
  const mapRef = useRef();

  const onMapLoad = useCallback(() => {
    mapRef.current.fitBounds(bounds);
  }, [bounds]);

  const geojson = useMemo(() => {
    const bounds = new LngLatBounds();
    for (const record of records) {
      for (const coord of record.geometry.coordinates) {
        bounds.extend(coord);
      }
    }
    setBounds(bounds);
    return {
      type: "FeatureCollection",
      features: records.map((rec) => ({
        type: "Feature",
        geometry: rec.geometry,
        properties: {},
      })),
    };
  }, [records]);

  return (
    <Map
      ref={mapRef}
      onLoad={onMapLoad}
      mapStyle="mapbox://styles/mapbox/light-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      <Source type="geojson" data={geojson}>
        <Layer
          id="fill"
          type="fill"
          paint={{
            "fill-color": "red",
            "fill-opacity": 0.35,
          }}
        />
        <Layer
          id="outline"
          type="line"
          paint={{
            "line-color": "#333",
            "line-opacity": 0.65,
          }}
        />
      </Source>
    </Map>
  );
};
