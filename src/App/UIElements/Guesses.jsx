export default function Guesses({ guesses, setPreviousMarker, maxCompassDistance }) {

  console.log(guesses)
  return (
    <div className="guess-container">
      {guesses.map((guess, i) => (
        <Guess
          key={"guess"+i}
          guess={guess}
          i={i}
          setPreviousMarker={setPreviousMarker}
          maxCompassDistance={maxCompassDistance}
        />
      ))}
    </div>
  );
}

const Guess = ({ guess, i, setPreviousMarker, maxCompassDistance }) => {
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
      <>
        <a>{i + 1}. Guess:</a> <a>{guess?.distance || "--"} km </a>
        {guess?.distance && guess.distance <= maxCompassDistance && (
          <i
            style={{
              rotate: `${guess?.angleToTarget}deg`,
            }}
            className={"fa-regular fa-circle-up"}
          ></i>
        )}
      </>
    </div>
  );
};
