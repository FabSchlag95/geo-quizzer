import { useContext, useState } from "react";
import { gameContext } from "../../App";

export default function GuessBar() {
  const { guesses, setPreviousMarker } = useContext(gameContext);
  return (
    <div className="guess-bar">
      {guesses.map((guess, i) => (
        <Guess
          key={guess?.distance || "null" + i}
          guess={guess}
          i={i}
          setPreviousMarker={setPreviousMarker}
        />
      ))}
    </div>
  );
}

const Guess = ({ guess, i, setPreviousMarker }) => {
  return (
    <div
      onClick={() => {
        if (guess?.coords) {
          setPreviousMarker(guess);
        }
      }}
      className="guess"
      style={{ backgroundColor: guess.color }}
    >
      <div>
        <a>{i + 1}. Guess:</a> <a>{guess?.distance || "--"} km </a>
        {guess?.angleToTarget&&<i
          style={{
            rotate: `${guess?.angleToTarget}deg`
          }}
          className={"fa-regular fa-circle-up"}
        ></i>}
      </div>
    </div>
  );
};
