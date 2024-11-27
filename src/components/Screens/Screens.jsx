import React, { act } from "react";
import "./Screens.css";
import StartScreen from "./StartScreen";
import HintScreen from "./HintScreen";
import GuessResultScreen from "./GuessResultScreen";
import EndWindow from "./EndWindow";

export default function Screens({ context }) {
  const {
    gameState,
    nextGameState,
    activeHints,
    guesses,
    latestGuess,
    win,
    globalPoints,
  } = context;

  if (gameState == 2) return <></>;
  if (gameState == 4)
    return (
      <div className="intermediate-screen end-window">
        <EndWindow
          nextGameState={nextGameState}
          win={win}
          guesses={guesses}
          latestGuess={latestGuess}
          globalPoints={globalPoints}
        />
      </div>
    );
  return (
    <div className="overlay">
      <div className="intermediate-screen">
        {gameState == 0 && <StartScreen nextGameState={nextGameState} />}
        {gameState == 1 && (
          <HintScreen nextGameState={nextGameState} activeHints={activeHints} />
        )}
        {gameState == 3 && (
          <GuessResultScreen
            nextGameState={nextGameState}
            latestGuess={latestGuess}
          />
        )}
      </div>
    </div>
  );
}
