import React from "react";
import Clock from "./Clock";
import HintDropdown from "./HintDropdown";
import GuessBar from "./GuessBar";
import ConfirmGuessBtn from "./ConfirmGuessBtn";
import GlobalPoints from "./GlobalPoints";

export default function Navigation({ context }) {
  const { counter, nextGameState, activeHints, guesses, coords, globalPoints,handlePreviousMarker } =
    context;

  return (
    <>
      <div className="nav-header">
        <HintDropdown activeHints={activeHints} />
        <div className="nav-header-right">
          <GlobalPoints globalPoints={globalPoints} />
          <Clock counter={counter} />
        </div>
      </div>
      <GuessBar handlePreviousMarker={handlePreviousMarker} guesses={guesses} />
      <ConfirmGuessBtn nextGameState={nextGameState} coords={coords} />
    </>
  );
}
