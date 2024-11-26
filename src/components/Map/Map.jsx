import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMapEvents,
  GeoJSON,
  useMap,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import borderData from "../../assets/borders.json";
import { quizzerIcon, previousMarkerIcon } from "./quizzerIcon";

export default function Map({
  coords,
  setCoords,
  showBorders,
  previousMarker,
  targetMarker,
}) {
  return (
    <>
      <MapContainer
        center={[50, 50]}
        maxZoom={9}
        minZoom={3}
        zoom={5}
        scrollWheelZoom={true}
      >
        <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png" />
        {coords && <Marker position={coords} icon={quizzerIcon} />}
        {previousMarker && (
          <>
            <MapGoToLocation
              coords={targetMarker || previousMarker.coords}
              zoom={targetMarker ? getRelativeZoom(previousMarker.distance) : 8}
            />
            <Marker
              position={previousMarker.coords}
              icon={previousMarkerIcon(previousMarker.color)}
            />
          </>
        )}
        {targetMarker && (
          <>
            <Marker position={targetMarker} />
            <Polyline
              key={"targetline"}
              positions={[previousMarker.coords, targetMarker]}
              color={previousMarker.color}
            />
          </>
        )}
        <MapEventComponent setCoords={setCoords} />
        {showBorders && (
          <GeoJSON
            data={borderData}
            style={{
              color: "var(--accent-color)",
              weight: 1,
              opacity: 1,
              fillOpacity: 0,
            }}
          />
        )}
      </MapContainer>
    </>
  );
}

function MapEventComponent({ setCoords }) {
  useMapEvents({
    click(e) {
      setCoords(e.latlng);
    },
  });
  return null;
}

function MapGoToLocation({ coords, zoom }) {
  const map = useMap();
  useEffect(() => {
    console.log(coords);
    if (coords) {
      map.setView(coords, zoom);
    }
  }, [coords, map]);
  return null;
}

// helper function to get a zoom to target relative to distance of latest guess/ previous marker
const getRelativeZoom = (distance) => {
  // minZoom = 3 MaxZoom = 9
  const maxDistance = 20000; // earth circumference / 2 ~ 20000km
  const zoom = 3 + 6 - Math.pow(distance / maxDistance,0.3) * 6;
  return zoom;
};
