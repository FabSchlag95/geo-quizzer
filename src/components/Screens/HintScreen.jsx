import { useEffect, useState } from "react";
import { useContext } from "react";
import { gameContext } from "../../App";

export default function HintScreen() {
  const { nextGameState, activeHints } = useContext(gameContext);
  const [counter, setCounter] = useState(10);

  let timer = null;
  useEffect(() => {
    if (counter > 0) timer = setTimeout(() => setCounter((c) => c - 1), 1000);
    else if (counter === 0) nextGameState();
    return () => clearTimeout(timer); // return function to clear Time out to avoid side effects
  }, [counter]);

  return (
    <>
      <h3>{activeHints.length}. Hint</h3>
      <p className="hint-content">{activeHints.slice(-1)}</p>
      <button onClick={() => nextGameState()}>Start Guessing! {counter}</button>
    </>
  );
}
