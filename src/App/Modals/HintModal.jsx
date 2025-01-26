/**
 * HintModal component displays the current hint and a countdown timer.
 * After the countdown is over it switches automatically to the next state.
 * Depending on the difficulty a difficulty label is provided.
 * @component
 */

import { useContext, useEffect, useState } from "react";
import ImageComponent from "../../components/ImageComponent";
import { gameContext } from "../contexts";

export default function HintModal() {
  const { nextGameState, activeHints, currentItem } = useContext(gameContext);

  const [counter, setCounter] = useState(30); // 30 sec timer
  const [difficultyLabel, setDifficultyLabel] = useState("an easy");

  const currentHint = activeHints.slice(-1)[0];

  useEffect(() => {
    if (currentItem)
      switch (currentItem.difficulty) {
        case 1:
          setDifficultyLabel("an easy");
          break;
        case 2:
          setDifficultyLabel("a harder");
          break;
        case 3:
          setDifficultyLabel("a very hard");
          break;
        default:
          setDifficultyLabel("an easy");
          break;
      }
  }, [currentItem]);

  let timer = null;
  useEffect(() => {
    if (counter > 0) timer = setTimeout(() => setCounter((c) => c - 1), 1000);
    else if (counter === 0) nextGameState();
    return () => clearTimeout(timer); // return function to clear Time out to avoid side effects
  }, [counter]);

  return (
    <>
      <h3>{activeHints.length}. Hint</h3>
      {activeHints.length === 1 && (
        <p>
          That is{" "}
          <span
            style={{
              fontWeight: "bold",
              color:
                currentItem.difficulty == 1
                  ? "green"
                  : currentItem.difficulty == 2
                  ? "yellow"
                  : "red",
            }}
          >
            {difficultyLabel}
          </span>{" "}
          one!
        </p>
      )}
      {currentHint?.image && <ImageComponent image={currentHint?.image} />}
      <p>{currentHint.text}</p>
      <button onClick={() => nextGameState()}>Start Guessing! {counter}</button>
    </>
  );
}
