export default function EndWindow({
  restartGame,
  win,
  guesses,
  roundPoints,
  globalPoints,
  targetName,
}) {
  return (
    <>
    <h4>The place was {targetName}.</h4>
      <h3>{win ? "You got it!" : "Close but not close enough..."}</h3>
      {win ? (
        <div>
          <p>
            {"You needed " +
              guesses.length +
              " guess(es) to get there. That means " +
              roundPoints +
              " points for you."}
          </p>
          <p>{"You have now " + globalPoints + " points."}</p>
        </div>
      ) : (
        <div>
          <p>No more guesses left. That means you lost all your points.</p>
          <p>
            {"Your last guess was " +
              guesses.slice(-1)[0].distance +
              " kms away."}
          </p>
        </div>
      )}
      <button onClick={restartGame}>New Place!</button>
    </>
  );
}
