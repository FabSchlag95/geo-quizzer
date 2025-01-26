/**
 * GameMap component renders the interactive map for the game.
 * It uses the react-leaflet library to display the map and handle map events.
 * The component updates based on the game state and user interactions.
 *
 * @component
 * @returns {JSX.Element} The rendered GameMap component.
 */

import { useContext, useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  useMap,
  Marker,
  GeoJSON,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import { gameContext } from "../contexts";
import { compassMarker, quizzerMarker, targetMarker } from "./customIcon";
import { Polyline } from "react-leaflet";
import borders from '../../assets/borders.json'

const GameMap = () => {
  const {
    showBorders,
    coordsToGo,
    changeSettings,
    tempCoords,
    previousMarker,
    currentItem,
    lastGuess,
    stateName,
    maps,
    map,
  } = useContext(gameContext);
  const [endScreenZoom, setEndScreenZoom] = useState(null);

  useEffect(() => {
    if (lastGuess) {
      setEndScreenZoom(getRelativeZoom(lastGuess.distance));
    } else {
      setEndScreenZoom(null);
    }
  }, [lastGuess]);

  // don't mount the map at game start to prevent sever spamming
  if (stateName === "INITIAL") return;

  return (
    <>
      <MapContainer
        center={[50, 50]}
        maxZoom={15}
        minZoom={2}
        zoom={5}
        scrollWheelZoom={true}
        maxBounds={[
          [-90, -180],
          [90, 180],
        ]}
        maxBoundsViscosity={0.5}
        worldCopyJump={false}
      >
        {maps && map && <TileLayer url={maps[map]} />}
        {showBorders && (
          <GeoJSON
          data={borders}
          style={{
            color: "var(--accent-color)",
            weight: 1,
            opacity: 1,
            fillOpacity: 0,
          }}
        />
        )}
        <MapEventComponent
          setTempCoords={(coords) => changeSettings({ tempCoords: coords })}
        />

        {
          // set the active quizzing marker on the map
          tempCoords && (
            <Marker position={tempCoords} icon={quizzerMarker(40)} />
          )
        }
        {
          // set marker on the map which the user has activated
          previousMarker.map((guess, index) => (
            <Marker
              key={index}
              position={guess.coords}
              icon={compassMarker(guess.color, 50, guess.angleToTarget)}
            />
          ))
        }
        {coordsToGo && <MapGoToLocation position={coordsToGo} />}
        {lastGuess && endScreenZoom && currentItem && (
          <>
            <Marker
              icon={targetMarker(40)}
              position={currentItem.target.coords}
            />
            <MapGoToLocation
              position={currentItem.target.coords}
              zoom={endScreenZoom}
            />
            <Polyline
              positions={[currentItem.target.coords, lastGuess.coords]}
              color={lastGuess.color}
            />
          </>
        )}
      </MapContainer>
    </>
  );
};
GameMap.displayName = "GameMap";
export default GameMap;

/**
 * Functional component handles map click events to set temporary coordinates.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.setTempCoords - Function to set temporary coordinates.
 * @returns {null} This component does not render anything.
 */
function MapEventComponent({ setTempCoords }) {
  useMapEvents({
    click(e) {
      setTempCoords(e.latlng);
    },
  });
  return null;
}

/**
 * Functional component zooms the map to a specified location.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.position - The coordinates to zoom to.
 * @param {number} [props.zoom] - The zoom level to set; can be omitted.
 * @returns {null} This component does not render anything.
 */
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
  // short Distance: zoom=10; long distance:zoom=2
  const maxDistance = 20000; // earth circumference / 2 ~ 20000km
  const zoom = 10 - Math.pow(distance / maxDistance, 0.2) * 8; // 2-10
  return zoom;
}
