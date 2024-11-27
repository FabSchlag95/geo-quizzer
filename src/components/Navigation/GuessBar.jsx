import React, { memo } from "react";

const GuessBar = memo(({ guesses, handlePreviousMarker })=>{
  return (
    <div className="guess-bar">
      {guesses.map((guess, i) => (
        <Guess
          key={guess?.distance || "null" + i}
          guess={guess}
          i={i}
          handlePreviousMarker={handlePreviousMarker}
        />
      ))}
    </div>
  );
})

const Guess = ({ guess, i, handlePreviousMarker }) => {
  return (
    <div
      onClick={() => {
        if (guess?.coords) {
          handlePreviousMarker(guess);
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

export default GuessBar