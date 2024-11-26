import React, { useContext } from "react";
import "./screens.css";
import { gameContext } from "../../App";
import StartScreen from "./StartScreen";
import HintScreen from "./HintScreen";
import GuessResultScreen from "./GuessResultScreen";
import EndWindow from "./EndWindow";

export default function Overlay() {
  const { gameState } = useContext(gameContext);
  if (gameState == 2) return <></>;
  if (gameState == 4)
    return (
      <div className="intermediate-screen end-window"><EndWindow /></div>

    );
  return (
    <div className="overlay">
      <div className="intermediate-screen">
        {gameState == 0 && <StartScreen />}
        {gameState == 1 && <HintScreen />}
        {gameState == 3 && <GuessResultScreen />}
      </div>
    </div>
  );
}
