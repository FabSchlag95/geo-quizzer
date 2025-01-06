import Header from "./Misc/Header";
import Footer from "./Misc/Footer";
import "./App.css";
import useGameStates from "../hooks/useGameStates";
import Overlay from "./Screens/Overlay";
import GameMap from "./GameMap/GameMap";
import { gameContext } from "./contexts";
import UI from "./UIElements/UI";
import gameData from "../assets/gameData.json";
import borders from "../assets/borders.json";
import { useState } from "react";
import InitialAnimation from "./Misc/InitialAnimation";

export default function App() {
  const [defaultGameState, setDefaultGameState] = useState({
    // pre game settings
    maxRounds: 5,
    roundTime:60,
    maxWinDistance: 50,
    maxCompassDistance: 2000,
    // data
    rules: gameData.rules,
    allItems: gameData.items,
    notPlayedItems: gameData.items,
    // optionals
    activeHints: [],
    guesses: [],
    currentItem: null,
    stateName: "INITIAL",
    showBorders: true,
    currentScreen: "",
    previousMarker: null,
    round: 0,
    globalPoints: 0,
    roundPoints: 0,
    win: false,
    previousScreen: null,
    tempCoords: null,
  });

  const [state, nextGameState, toggleRules, restartGame, changeSettings] =
    useGameStates(defaultGameState);
  
  return (
    <>
      {state.stateName === "INITIAL" && <InitialAnimation nextGameState={nextGameState}/>}
      <gameContext.Provider
        value={{
          ...state,
          nextGameState,
          toggleRules,
          restartGame,
          borders,
          changeSettings,
        }}
      >
        <Header />
        {state.currentScreen && <Overlay />}
        {state.stateName === "GUESSING" && <UI />}
        <GameMap />
        <Footer />
      </gameContext.Provider>
    </>
  );
}
