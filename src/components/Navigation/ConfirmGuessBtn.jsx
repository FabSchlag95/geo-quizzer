import React, { useContext } from "react";
import { gameContext } from "../../App";

export default function ConfirmGuessBtn() {
  const { coords,nextGameState } = useContext(gameContext)
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
