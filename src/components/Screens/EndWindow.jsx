import React, { useContext } from "react";
import { gameContext } from "../../App";

export default function EndWindow() {
  const { nextGameState, win, roundPoints, latestGuess, globalPoints } =
    useContext(gameContext);
  return (
    <>
      <h3>{win ? "You got it!" : "Close but not close enough..."}</h3>
      {win ? (
        <div>
          <p>
            {"You needed " +
              (6 - roundPoints / 10) +
              " guess(es) to get there. That means " +
              roundPoints +
              " points for you."}
          </p>
          <p>{"You have now " + globalPoints + " points."}</p>
        </div>
      ) : (
        <div>
          <p>No more guesses left. That means you lost all your points.</p>
          <p>{"Your last guess was " + latestGuess.distance + " kms away."}</p>
        </div>
      )}
      <button onClick={nextGameState}>New Place!</button>
    </>
  );
}
