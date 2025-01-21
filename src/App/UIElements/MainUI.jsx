import Clock from "./Clock";
import Hints from "./Hints";
import Guesses from "./Guesses";
import GlobalPoints from "./GlobalPoints";
import { gameContext } from "../contexts";
import { useContext } from "react";
import "./UI.css";
import ConfirmGuessBtn from "./ConfirmGuessBtn";
import Streak from "./Streak";

export default function MainUI() {
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
      <Hints activeHints={activeHints} />
      <div className="ui-container-right">
        <div className="scoring-container">
          <GlobalPoints globalPoints={globalPoints} />
          <Streak />
        </div>
        <Clock roundTime={roundTime} onCountdownFinished={nextGameState} />
        <Guesses
          setPreviousMarker={(guess) =>
            changeSettings({ previousMarker: guess })
          }
          guesses={guesses}
          maxCompassDistance={maxCompassDistance}
        />
        <ConfirmGuessBtn
          tempCoords={tempCoords}
          nextGameState={nextGameState}
        />
      </div>
    </div>
  );
}
