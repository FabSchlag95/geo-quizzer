import Clock from "./Clock";
import Hints from "./Hints";
import Guesses from "./Guesses";
import GlobalPoints from "./GlobalPoints";
import { gameContext } from "../contexts";
import { useContext } from "react";
import "./UI.css";
import ConfirmGuessBtn from "./ConfirmGuessBtn";

export default function UI() {
  const {
    activeHints,
    globalPoints,
    nextGameState,
    tempCoords,
    guesses,
    changeSettings,
    roundTime,
    maxCompassDistance,
  } = useContext(gameContext);

  return (
    <div className="ui-container">
      <Guesses
        setPreviousMarker={
          (guess) => changeSettings({ previousMarker: guess })
        }
        guesses={guesses}
        maxCompassDistance={maxCompassDistance}
      />
      <div className="nav-header">
        <Hints activeHints={activeHints} />
        <div className="nav-header-right">
          <GlobalPoints globalPoints={globalPoints} />
          <Clock roundTime={roundTime} onCountdownFinished={nextGameState} />
        </div>
      </div>
      <ConfirmGuessBtn tempCoords={tempCoords} nextGameState={nextGameState} />
    </div>
  );
}
