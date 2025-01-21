import Header from "./Misc/Header";
import Footer from "./Misc/Footer";
import "./App.css";
import useGameStates from "../hooks/useGameStates";
import MainModal from "./Modals/MainModal";
import GameMap from "./GameMap/GameMap";
import { gameContext } from "./contexts";
import MainUI from "./UIElements/MainUI";
import borders from "../assets/borders.json";
import InitialAnimation from "./Misc/InitialAnimation";

export default function App() {
  const [state, nextGameState, toggleRules, restartGame, changeSettings] =
    useGameStates();

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
        <MainModal />
        {state.stateName === "GUESSING" && <MainUI />}
        <GameMap />
        <Footer />
      </gameContext.Provider>
    </>
  );
}
