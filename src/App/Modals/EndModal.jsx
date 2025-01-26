/**
 * EndModal component displays the result of the user's latest game attempt.
 * It shows a success message if the user wins, or an encouragement message if they lose.
 * It also provides details about the user's performance and allows them to start a new round.
 *
 * @component
 *
 */

import { useContext } from "react";
import { gameContext } from "../contexts";

export default function EndModal() {
  const {
    restartGame,
    win,
    lastGuess,
    currentItem,
    credits,
    itemsFound,
    creditsWon,
  } = useContext(gameContext);
  return (
    <>
      <h2 style={{ color: win ? "var(--secondary-color)" : "var(--red)" }}>
        {win ? "You got it! 🎉" : "Sorry, not there yet..."}
      </h2>
      <div
        className="modal-container"
        style={{
          backdropFilter: "blur",
          backgroundColor: "var(--background-color-transparent)",
        }}
      >
        <h3>{`It's ${currentItem?.target?.name}!`}</h3>
        {win ? (
          <div>
            <p>
              You earned <b>{creditsWon} extra credits</b>. So, now you have {credits}{" "}
              credits for the next rounds.{" "}
            </p>
            <p>So far, you have found <b>{itemsFound} item(s) in a row</b>. Keep going!</p>
          </div>
        ) : (
          <div>
            <p>
              {lastGuess?.distance
                ? "Your last guess was " + lastGuess.distance + " kms away."
                : "You didn't even set a final guess."}
            </p>
            <p>
              This round ends for you. You have found <b>{itemsFound} item(s) in a
              row</b>.
            </p>
          </div>
        )}
        <button onClick={() => restartGame(win)}>New Place!</button>
      </div>
    </>
  );
}
