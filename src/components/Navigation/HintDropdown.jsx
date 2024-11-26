import { useEffect, useRef, useState, useContext } from "react";
import { gameContext } from "../../App";
import "./Navigation.css";

export default function HintDropdown() {
  const { activeHints } = useContext(gameContext);

  return (
    <div className="hint-dropdown">
      {activeHints.map((hint, i) => (
        <Hint
          key={i}
          hintText={hint}
          i={i}
          isLast={activeHints.slice(-1) == hint}
        />
      ))}
    </div>
  );
}

function Hint(props) {
  const { hintText, i, isLast } = props;
  return (
    <>
      {isLast ? (
        <details open>
          <summary>{i + 1}. Hint</summary>
          <p>{hintText}</p>
        </details>
      ) : (
        <details>
          <summary>{i + 1}. Hint</summary>
          <p>{hintText}</p>
        </details>
      )}
    </>
  );
}
