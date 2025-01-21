import "./Modal.css";
import RulesModal from "./RulesModal";
import HintModal from "./HintModal";
import EndModal from "./EndModal";
import GuessResultModal from "./GuessResultModal";
import { useContext } from "react";
import { gameContext } from "../contexts";

export default function MainModal() {
  const {
    rules,
    currentScreen,
    restartGame,
    nextGameState,
    toggleRules,
    activeHints,
    guesses,
    win,
    roundPoints,
    globalPoints,
    currentItem,
    showRules,
    lastGuess,
    round,
  } = useContext(gameContext);

  if (currentScreen)
    return (
      <div
        className={
          "overlay " + (currentScreen === "END_SCREEN" ? "end-modal" : "")
        }
      >
        <>
          {currentScreen === "END_SCREEN" && (
            <h2>{`It's ${currentItem?.target?.name}!`}</h2>
          )}
          <div
            className="modal-container"
            style={
              currentScreen === "END_SCREEN"
                ? {
                    backdropFilter: "blur",
                    backgroundColor: "var(--background-color-transparent)",
                  }
                : {}
            }
          >
            {
              {
                INFO: (
                  <RulesModal
                    rules={rules}
                    onClick={nextGameState}
                    isStart={true}
                  />
                ),
                HINT: (
                  <HintModal
                    activeHints={activeHints}
                    nextGameState={nextGameState}
                  />
                ),
                GUESS_RESULT: (
                  <GuessResultModal
                    latestGuess={guesses.slice(-1)[0]}
                    nextGameState={nextGameState}
                  />
                ),
                END_SCREEN: (
                  <EndModal
                    restartGame={restartGame}
                    win={win}
                    lastGuess={lastGuess}
                    globalPoints={globalPoints}
                    roundPoints={roundPoints}
                    round={round}
                  />
                ),
              }[currentScreen]
            }
          </div>
        </>
      </div>
    );
  else if (showRules)
    return (
      <div className="modal-container intermediate-rules">
        <RulesModal rules={rules} onClick={toggleRules} isStart={false} />
      </div>
    );
}
