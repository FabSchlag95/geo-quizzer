import { useContext, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  useMap,
  GeoJSON,
  Marker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import { gameContext } from "../contexts";
import { compassMarker, defaultMarker, quizzerMarker } from "./customIcon";

const GameMap = () => {
  const { showBorders, borders, changeSettings, tempCoords, previousMarker } =
    useContext(gameContext);
  return (
    <>
      <MapContainer
        center={[50, 50]}
        maxZoom={9}
        minZoom={3}
        zoom={5}
        scrollWheelZoom={true}
        maxBounds={[
          [-90, -180],
          [90, 180],
        ]}
        maxBoundsViscosity={1.0}
        worldCopyJump={false}
      >
        <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png" />
        <MapEventComponent
          setTempCoords={(coords) => changeSettings({ tempCoords: coords })}
        />

        {
          // The border paths shown on map which is optional for the user
          showBorders && (
            <GeoJSON
              data={borders}
              style={{
                color: "var(--accent-color)",
                weight: 1,
                opacity: 1,
                fillOpacity: 0,
              }}
            />
          )
        }

        {
          // set a marker on the map, this is depending on the tempCoords which get set by user clicking on the map
          tempCoords && <Marker position={tempCoords} icon={quizzerMarker(50)}/>
        }
        {
          // set a marker on the map, this is depending on the tempCoords which get set by user clicking on the map
          previousMarker && (
            <>
              <Marker
                position={previousMarker.coords}
                icon={
                  previousMarker.showCompass
                    ? compassMarker(
                        previousMarker.color,
                        50,
                        previousMarker.angleToTarget
                      )
                    : defaultMarker(previousMarker.color, 50)
                }
              />
              <MapGoToLocation position={previousMarker.coords} zoom={8} />
            </>
          )
        }
      </MapContainer>
    </>
  );
};
GameMap.displayName = "GameMap";
export default GameMap;

// Additional Map related Components and Functions
// functional component for click handling
function MapEventComponent({ setTempCoords }) {
  useMapEvents({
    click(e) {
      setTempCoords(e.latlng);
    },
  });
  return null;
}

// functional component for zooming to a location
function MapGoToLocation({ position, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, zoom);
    }
  }, [position, map, zoom]);
  return null;
}

// helper function to get a zoom to target relative to distance of latest guess/ previous marker
function getRelativeZoom(distance) {
  // minZoom = 3 MaxZoom = 9
  const maxDistance = 20000; // earth circumference / 2 ~ 20000km
  const zoom = 9 - Math.pow(distance / maxDistance, 0.3) * 9;
  return zoom;
}

// helper function to get the middle between the targetCoords and the guessCoords
function getMiddleBetweenCoords(coords1, coords2) {
  const lng = (coords1.lng + coords2.lng) / 2;
  const latWithOffset = Math.min(coords1.lat, coords2.lat);
  return [latWithOffset, lng];
}
