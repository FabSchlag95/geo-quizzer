import React from "react";

export default function EndWindow({ nextGameState, win, guesses, latestGuess, globalPoints }) {
  return (
    <>
      <h3>{win ? "You got it!" : "Close but not close enough..."}</h3>
      {win ? (
        <div>
          <p>
            {"You needed " +
              (guesses.length) +
              " guess(es) to get there. That means " +
              (60-guesses.length*10) +
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
