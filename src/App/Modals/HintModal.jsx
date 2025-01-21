import { useEffect, useState } from "react";
import ImageComponent from "../../components/ImageComponent";

export default function HintModal({ nextGameState, activeHints }) {
  const [counter, setCounter] = useState(10);

  const currentHint = activeHints.slice(-1)[0];

  let timer = null;
  useEffect(() => {
    if (counter > 0) timer = setTimeout(() => setCounter((c) => c - 1), 100000);
    else if (counter === 0) nextGameState();
    return () => clearTimeout(timer); // return function to clear Time out to avoid side effects
  }, [counter]);

  return (
    <>
      <h3>{activeHints.length}. Hint</h3>
      {currentHint?.image && <ImageComponent imagePath={currentHint.image} />}
      <p className="hint-content">{currentHint?.text}</p>
      <button onClick={() => nextGameState()}>Start Guessing! {counter}</button>
    </>
  );
}
