import React from "react";

export default function ConfirmGuessBtn({ coords,nextGameState }) {
  return (
    <button onClick={nextGameState}>
      <i
        className={
          "fa-solid fa-circle-check confirm-guess "+(coords ? "active" : "inactive")
        }
      ></i>
    </button>
  );
}
