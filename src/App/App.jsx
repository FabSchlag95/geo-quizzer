/**
 * App component that serves as the main entry point for the application.
 * It manages the game state and renders different all main and container components.
 *
 * @component
 */


import Header from "./Misc/Header";
import Footer from "./Misc/Footer";
import "./App.css";
import useGameStates from "../hooks/useGameStates";
import MainModal from "./Modals/MainModal";
import GameMap from "./GameMap/GameMap";
import { gameContext } from "./contexts";
import MainUI from "./UIElements/MainUI";
import InitialAnimation from "./Misc/InitialAnimation";

export default function App() {
  const gameState = useGameStates();
  const { state, nextGameState } = gameState;

  return (
    <>
      {state.stateName === "INITIAL" && (
        <InitialAnimation nextGameState={nextGameState} />
      )}
      <gameContext.Provider
        value={{
          ...state,
          ...gameState,
        }}
      >
        <Header />
        <MainModal />
        {
          // reset and don't show the ui conditionally / restarts the clock
          !(
            state.currentScreen === "END_SCREEN" ||
            state.stateName === "START_ROUND"
          ) && <MainUI />
        }
        <GameMap />
      </gameContext.Provider>
      <Footer />
    </>
  );
}
