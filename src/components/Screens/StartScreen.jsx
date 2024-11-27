import React from "react";
import * as gameData from "../../assets/gameData.json";


export default function StartScreen({ nextGameState }) {
  return (
    <>
      <h3>Rules:</h3>
      <ul>
        {gameData.rules.map((rule,i) => (
          <li key={rule+i}>{rule}</li>
        ))}
      </ul>
      <button onClick={nextGameState}>Start First Round!</button>
    </>
  );
}
