/**
 * GuessResultModal component displays the result of the user's latest guess if the round is not over.
 * It shows a headline based on the distance of the guess from the target location
 * and a message indicating how far the guess is from the target.
 * It also provides a button to proceed to the next game state.
 *
 * @component
 */
import { useContext, useState } from "react";
import { gameContext } from "../contexts";

export default function GuessResultModal() {
const { guesses, nextGameState } = useContext(gameContext);
const [currentGuess, setCurrentGuess] = useState(guesses.slice(-1)[0]);
  return (
      <>
        <h3>{setHeadline(currentGuess?.distance)}</h3>
        <p>
          { currentGuess?.distance
            ? `Your guess is located ${currentGuess.distance} km from the place we are looking for.`
            : "You have not set a guess on the map."}
        </p>
        <button onClick={nextGameState}>
          Continue!
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