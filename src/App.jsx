import { useState, createContext, useEffect, useCallback } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import useCountdown from "./hooks/useCountdown";
import useGameState from "./hooks/useGameState";
import * as gameData from "./assets/gameData.json";
import useItems from "./hooks/useItems";
import useGuesses from "./hooks/useGuesses";
import Map from "./components/Map/Map";
import Screens from "./components/Screens/Screens";
import useRounds from "./hooks/useRounds";
import useHints from "./hooks/useHints";

export default function App() {
  // meta options
  const [showBorders, setShowBorders] = useState(false);
  const [showCities, setShowCities] = useState(false);

  // game engine
  const [counter, startCountdown, resetCountDown] = useCountdown(60);
  const [round, nextRound, resetRound] = useRounds();
  const [gameState, setGameState, nextGameState] = useGameState(0, round);
  const [currentItem, nextRandomItem] = useItems(gameData.items);
  const [activeHints, initializeHints, activateNextHint] = useHints();
  const [globalPoints, setGlobalPoints] = useState(0);
  const [win, setWin] = useState(false);

  // coord/guess handling
  const [coords, setCoords] = useState(null);
  const [previousMarker, setPreviousMarker] = useState(null);
  const [latestGuess, guesses, addGuess, resetGuesses] = useGuesses();
  const [showTargetMarker, setShowTargetMarker] = useState(null);

  const handlePreviousMarker = useCallback((selectedGuess) => {
    setPreviousMarker(selectedGuess);
  }, [setPreviousMarker]);

  // useEffects to handle states and set/reset variables
  // ---- handle game states
  useEffect(() => {
    if (gameState == 2) {
      // game state 2 == the play state
      startCountdown();
    } else if (gameState == 3) {
      // Handling game state 3 == after one round
      activateNextHint();
      addGuess(coords, currentItem.target);
      setCoords(null);
      nextRound();
      resetCountDown();
      handlePreviousMarker(null);
    } else if (gameState == 4) {
      // Handling game state 4 == after all rounds or win; This is where the right answer is revealed.
      setShowTargetMarker(true);
      handlePreviousMarker(latestGuess);
      setGlobalPoints(globalPoints + (60 - guesses.length * 10));
    } else if (gameState == 5) {
      // this is the reset state
      resetGuesses();
      resetRound();
      setShowTargetMarker(false);
      handlePreviousMarker(null);
    }
  }, [gameState]);

  // await changes before switching to next game state.
  useEffect(() => {
    if (gameState == 5 && !showTargetMarker && !previousMarker && round == 0) {
      nextRandomItem();
      nextGameState();
    }
  }, [gameState, showTargetMarker, previousMarker, round]);

  // ---  when a (new) currentItem, that is an item with hints and target, hints will be set
  useEffect(() => {
    if (currentItem) {
      initializeHints(currentItem);
    }
  }, [currentItem]);

  useEffect(() => {
    if (gameState === 5) return;
    // win or loose condition: when a 5. round is reached (no more hints) the game is lost, otherwise must be a win
    if (latestGuess && latestGuess.distance < 50) {
      setWin(true);
      setGameState(4);
    } else if (round == 5) {
      setWin(false);
      setGlobalPoints(0);
      setGameState(4);
    }
  }, [round, latestGuess]);

  // ---- when counter is up it will automatically switch to next screen
  useEffect(() => {
    if (counter <= 0) {
      nextGameState();
    }
  }, [counter]);

  if (!currentItem) return <div>Loading Items</div>;
  if (!activeHints) return <div>Loading Hints</div>;

  return (
    <>
      <Header
        gameState={gameState}
        showBorders={showBorders}
        setShowBorders={setShowBorders}
      />
      <Map
        coords={coords}
        setCoords={setCoords}
        showBorders={showBorders}
        previousMarker={previousMarker}
        targetMarker={showTargetMarker && currentItem.target}
      />
      {gameState === 2 ? (
        <Navigation
          context={{
            counter,
            nextGameState,
            activeHints,
            guesses,
            coords,
            globalPoints,
            handlePreviousMarker
          }}
        />
      ) : (
        <Screens
          context={{
            gameState,
            nextGameState,
            activeHints,
            guesses,
            latestGuess,
            coords,
            win,
            globalPoints,
            handlePreviousMarker,
          }}
        />
      )}
      <Footer />
    </>
  );
}

function Header({ gameState, showBorders, setShowBorders }) {
  return (
    <header className={gameState !== 2 ? "header-shown" : undefined}>
      <h2>GeoQuizzer</h2>
      <div className="header-options">
        <button
          onClick={() => setShowBorders(!showBorders)}
          style={
            showBorders
              ? {
                  textDecoration: "underline",
                  textDecorationColor: "var(--font-color)",
                  textDecorationThickness: 3,
                }
              : {}
          }
        >
          Borders
        </button>
        <button>I want another Place!</button>
        <button>Rules</button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer>
      <div>&copy; GeoQuizzer</div>
      <div>
        <a
          href="https://leafletjs.com"
          title="A JavaScript library for interactive maps"
        >
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="8"
            viewBox="0 0 12 8"
            className="leaflet-attribution-flag"
          >
            <path fill="#4C7BE1" d="M0 0h12v4H0z"></path>
            <path fill="#FFD500" d="M0 4h12v3H0z"></path>
            <path fill="#E0BC00" d="M0 7h12v1H0z"></path>
          </svg>
          Leaflet |
        </a>
        <a>
          Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX,
          GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User
          Community |
        </a>
        <a href=" www.geoboundaries.org">&copy;geoBoundaries</a>
      </div>
    </footer>
  );
}
