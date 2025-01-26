

/**
 * Hints component that displays all active hints and allows the user to purchase additional hints.
 * 
 * @component
 */
 

import { useContext, useEffect, useState } from "react";
import ImageComponent from "../../components/ImageComponent";
import PopUpWindow from "../../components/PopUpWindow";
import { gameContext } from "../contexts";

const Hints = () => {
  const { activeHints, credits, currentItem, activateNextHint, hintPrice } =
    useContext(gameContext);
  const [allHintsActive, setAllHintsActive] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);

  useEffect(() => {
    setAllHintsActive(currentItem?.hints?.length === activeHints?.length);
  }, [activeHints, currentItem]);

  return (
    <div className="hint-container">
      {activeHints.map((hint, i) => (
        <Hint
          key={i}
          hintText={hint.text}
          image={hint.image}
          i={i}
          isLast={activeHints.slice(-1)[0] == hint}
        />
      ))}
      <button
        className={"add-btn add-hint"}
        disabled={allHintsActive || credits < hintPrice}
        onClick={() => setShowPopUp(true)}
      >
        <i className="fa-solid fa-plus"></i>
        <p>Get another hint!</p>
      </button>
      {showPopUp && (
        <PopUpWindow>
          <p>Do you really want to buy another hint for {hintPrice} credits?</p>
          <button
            onClick={() => {
              setShowPopUp(false);
              activateNextHint();
            }}
          >
            Yes!
          </button>
          <button onClick={() => setShowPopUp(false)}>
            I&apos;ll keep trying without...
          </button>
        </PopUpWindow>
      )}
    </div>
  );
};


/**
 * Hint component that displays individual hint details. If provided, it displays an image which can be fullscreened.
 * 
 * @component
 */
function Hint({ hintText, image, i, isLast }) {
  return (
    <>
      <details open={isLast}>
        <summary>{i + 1}. Hint</summary>
        <div className="hint-ui-container">
          <p>{hintText}</p>
          {image && (
            <ImageComponent style={{ maxWidth: "20vw" }} image={image} />
          )}
        </div>
      </details>
    </>
  );
}

export default Hints;
