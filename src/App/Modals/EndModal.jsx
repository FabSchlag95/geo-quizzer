export default function EndModal({
  restartGame,
  win,
  lastGuess,
  roundPoints,
  globalPoints,
  round,
}) {
  return (
    <>
      <h3>{win ? "You got it!" : "Sorry, not there yet..."}</h3>
      {win ? (
        <div>
          <p>
            {"You needed " +
              round +
              " guess(es) to get there. That means " +
              roundPoints +
              " points for you."}
          </p>
          <p>{"You have now " + globalPoints + " points."}</p>
        </div>
      ) : (
        <div>
          <p>{"Your last guess was " + lastGuess.distance + " kms away."}</p>
          <p>Try another place!</p>
        </div>
      )}
      <button onClick={restartGame}>New Place!</button>
    </>
  );
}
