import React, { memo } from "react";
import "./Navigation.css";

const HintDropdown = memo(({ activeHints })=>{
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
})

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

export default HintDropdown