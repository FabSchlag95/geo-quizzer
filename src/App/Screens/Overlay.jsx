import "./Screens.css";
import Rules from "./Rules";
import HintScreen from "./HintScreen";
import EndScreen from "./EndScreen";
import GuessResultScreen from "./GuessResultScreen";
import { useContext } from "react";
import { gameContext } from "../contexts";


export default function Overlay() {
  const {
    previousScreen,
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
  } = useContext(gameContext);
  return (
    <div className="overlay">
      <div className="container-screen">
        {
          {
            'RULES': <Rules rules={rules} toggleRules={toggleRules} isStart={!previousScreen}/>,
            'HINT': <HintScreen activeHints={activeHints} nextGameState={nextGameState} />,
            'GUESS_RESULT': <GuessResultScreen latestGuess={guesses.slice(-1)[0]} nextGameState={nextGameState}/>,
            'END_SCREEN': <EndScreen targetName={currentItem?.target?.name} restartGame={restartGame} win={win} guesses={guesses} globalPoints={globalPoints} roundPoints={roundPoints}/>,
          }[currentScreen]
        }
      </div>
    </div>
  );
}
