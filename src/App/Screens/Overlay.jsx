import "./Screens.css";
import Rules from "./Rules";
import HintScreen from "./HintScreen";
import EndScreen from "./EndScreen";
import GuessResultScreen from "./GuessResultScreen";
import { useContext } from "react";
import { gameContext } from "../contexts";


export default function Overlay() {
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
    showRules
  } = useContext(gameContext);

  if(currentScreen || (showRules && !currentScreen))
  return (
    <div className="overlay">
      <div className="container-screen">
        {
          {
            'INFO': <Rules rules={rules} onClick={nextGameState} isStart={true}/>,
            'HINT': <HintScreen activeHints={activeHints} nextGameState={nextGameState} />,
            'GUESS_RESULT': <GuessResultScreen latestGuess={guesses.slice(-1)[0]} nextGameState={nextGameState}/>,
            'END_SCREEN': <EndScreen targetName={currentItem?.target?.name} restartGame={restartGame} win={win} guesses={guesses} globalPoints={globalPoints} roundPoints={roundPoints}/>,
          }[currentScreen]
        }
        {showRules && <Rules rules={rules} onClick={toggleRules} isStart={false}/>}
      </div>
    </div>
  );
}
