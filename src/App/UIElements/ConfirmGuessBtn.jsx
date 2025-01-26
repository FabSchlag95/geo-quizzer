
/**
 * ConfirmGuessBtn component renders a button that allows the user to confirm their guess at the bottom right hand side.
 * When clicked, it shows a pop-up window asking for confirmation.
 * It is clickable when there are tempCoords which are set by clicking on the plain map. 
 * NextGameState locks the tempCoords in the gameState hook.
 * @component
 * 
*/

import { useCallback, useContext, useState } from "react";
import PopUpWindow from "../../components/PopUpWindow";
import { gameContext } from "../contexts";

export default function ConfirmGuessBtn() {
  const { tempCoords, spareGuesses, nextGameState } = useContext(gameContext);
  const [showPopUp, setShowPopUp] = useState(false);
  const handleNextGameState = useCallback(() => {
    if (tempCoords) nextGameState();
  }, [tempCoords, nextGameState]);
  return (
    <>
      <i
        onClick={() => setShowPopUp(true)}
        className={
          "fa-solid fa-circle-check confirm-guess " +
          (tempCoords ? "active" : "inactive")
        }
      >
        <div></div>
      </i>
      {showPopUp && (
        <PopUpWindow>
          <p>Do you really want to set your guess here?</p>
          <p>
            {spareGuesses === 1 || !spareGuesses
              ? "This is your last Guess!"
              : `After this guess you'll have ${
                  spareGuesses - 1
                } guess(es) left.`}
          </p>
          <button
            onClick={() => {
              setShowPopUp(false);
              handleNextGameState();
            }}
          >
            My guess is final
          </button>
          <button
            onClick={() => {
              setShowPopUp(false);
            }}
          >
            I&apos;ll consider my choice
          </button>
        </PopUpWindow>
      )}
    </>
  );
}
