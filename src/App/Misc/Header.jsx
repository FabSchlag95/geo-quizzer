import { useContext } from "react";
import TextButton from "../../components/TextButton";
import { gameContext } from "../contexts";
import quizzerIcon from "../../assets/icons/icon-black.png"

const Header = () => {
  const { stateName, toggleRules, restartGame, showBorders, changeSettings } =
    useContext(gameContext);
  return (
    <header className="header-shown">
      <h2>GeoQuizzer</h2>
      <img src={quizzerIcon} className="logo"/>
      <div className="header-options">
        {/* <TextButton activeWhen={null} onClick={nextGameState}>nextGameState</TextButton> //Testing only */}

        <TextButton
          activeWhen={showBorders}
          onClick={() => changeSettings({ showBorders: !showBorders })}
        >
          Country Borders
        </TextButton>
        <TextButton activeWhen={null} onClick={restartGame}>
          I want another Place!
        </TextButton>
        <TextButton activeWhen={stateName === "RULES"} onClick={toggleRules}>
          Rules
        </TextButton>
      </div>
    </header>
  );
};

Header.displayName = "Header";

export default Header;
