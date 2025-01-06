import React from "react";

export default function GuessResultScreen({ latestGuess, nextGameState }) {
  return (
      <>
        <h3>{setHeadline(latestGuess?.distance)}</h3>
        <p>
          { latestGuess?.distance
            ? `Your guess is located ${latestGuess.distance} km from the place we are looking for.`
            : "You have not set a guess on the map."}
        </p>
        <button onClick={nextGameState}>
          Next Hint!
        </button>
      </>
  );
}


const setHeadline = (guess) => {
  if (!guess) return "Time is up...";
  if (guess > 10000) return "Wow! That is far away!";
  if (guess < 10000 && guess > 5000) return "Not really in the neighborhood.";
  if (guess < 5000 && guess > 1000) return "The continent could be right.";
  if (guess < 1000 && guess > 300)
    return "Might be the right country already!";
  if (guess < 300) return "Almost!";
};