/**
 * Guesses component renders the list of guesses and allows the user to buy extra guesses.
 *
 * @component
 */
import { useContext, useEffect, useState } from "react";
import PopUpWindow from "../../components/PopUpWindow";
import { gameContext } from "../contexts";

export default function Guesses() {
  const {
    spareGuesses,
    guesses,
    maxCompassDistance,
    activateSpareGuess,
    compassPrice,
    activateCompass,
    guessPrice,
    maxGuesses,
    credits,
    changeSettings,
  } = useContext(gameContext);

  const [showPopUp, setShowPopUp] = useState(false);
  return (
    <div className="guess-container">
      {guesses.map((guess, i) => (
        <Guess
          key={"guess" + i}
          guess={guess}
          i={i}
          maxCompassDistance={maxCompassDistance}
          compassPrice={compassPrice}
          activateCompass={activateCompass}
          credits={credits}
          changeSettings={changeSettings}
        />
      ))}
      {[...Array(spareGuesses)].map((_, i) => (
        <div key={"potential-guess-" + i} className="potential-guess">
          Potential Guess
        </div>
      ))}
      <button
        className={"add-spare-guess-btn add-btn"}
        disabled={
          credits < guessPrice || spareGuesses + guesses?.length >= maxGuesses
        }
        onClick={() => setShowPopUp(true)}
      >
        <p>Get an extra guess!</p>
        <i className="fa-solid fa-plus"></i>
      </button>
      {showPopUp && (
        <PopUpWindow>
          <p>
            Do you really want to buy another spare guess for {guessPrice}{" "}
            credits?
          </p>
          <button
            onClick={() => {
              setShowPopUp(false);
              activateSpareGuess();
            }}
          >
            Yes!
          </button>
          <button onClick={() => setShowPopUp(false)}>
            I&apos;ll take what I already got...
          </button>
        </PopUpWindow>
      )}
    </div>
  );
}


 /**
 * Guess component renders a single guess and allows the user to activate a compass for the guess which is handled via pop-up.
 *
 * @component
 */
const Guess = ({
  guess,
  i,
  credits,
  maxCompassDistance,
  compassPrice,
  activateCompass,
  changeSettings,

}) => {
  const [showPopUpCompass, setShowPopUpCompass] = useState(false);
  const [showCompass, setShowCompass] = useState(false);

  const handleShowPopUpCompass = () => {
    setShowPopUpCompass(!showPopUpCompass);
  };

  console.log(guess, showCompass)

  return (
    <>
      <div
        onClick={() => {
          if (guess?.coords) {
            if (!showCompass && guess?.distance && compassPrice <= credits) {
              handleShowPopUpCompass();
            } else if (showCompass) {
              changeSettings({ coordsToGo: guess.coords });
            }
          }
        }}
        className="guess"
        style={{ backgroundColor: guess.color }}
      >
        <a>{i + 1}. Guess:</a> <a>{guess?.distance || "--"} km </a>
      </div>


      {showPopUpCompass && !showCompass && (
        <PopUpWindow>
          {guess?.distance < maxCompassDistance ? (
            <p>
              Do you want to get the direction to the target for {compassPrice}{" "}
              credits?
            </p>
          ) : (
            <p>That guess is too far away, you cannot get a compass.</p>
          )}
          {guess?.distance < maxCompassDistance && (
            <button
              onClick={() => {
                handleShowPopUpCompass();
                setShowCompass(true);
                activateCompass(guess);
                changeSettings({ coordsToGo: guess.coords });
                return;
              }}
            >
              Yes!
            </button>
          )}
          <button onClick={handleShowPopUpCompass}>
            I&apos;ll keep trying without...
          </button>
        </PopUpWindow>
      )}
    </>
  );
};
