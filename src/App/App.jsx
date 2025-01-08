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
import InitialAnimation from "./Misc/InitialAnimation";

export default function App() {
  const defaultGameState = {
    // pre game settings
    maxRounds: 5,
    roundTime: 60,
    maxWinDistance: 50,
    maxCompassDistance: 2000,
    // constant data
    rules: gameData.rules,
    allItems: gameData.items,
    notPlayedItems: gameData.items,
    // variable data
    activeHints: [],
    guesses: [],
    currentItem: null,
    previousMarker: null,
    tempCoords: null,
    // flags
    stateName: "INITIAL",
    showBorders: true,
    currentScreen: "",
    win: false,
    showRules: false,
    // variables
    previousScreen: null,
    round: 0,
    globalPoints: 0,
    roundPoints: 0,
  };

  const [state, nextGameState, toggleRules, restartGame, changeSettings] =
    useGameStates(defaultGameState);

  return (
    <>
      {state.stateName === "INITIAL" && (
        <InitialAnimation nextGameState={nextGameState} />
      )}
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
        <Overlay />
        {state.stateName === "GUESSING" && <UI />}
        <GameMap />
        <Footer />
      </gameContext.Provider>
    </>
  );
}
