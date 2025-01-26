/**
 * Header component that provides options for the user to set meta options for the game.
 * Users can toggle map styles, show/hide borders+streets, display game rules, and restart the game.
 *
 * @component
 */

import { useContext, useState } from "react";
import TextButton from "../../components/TextButton";
import { gameContext } from "../contexts";
import quizzerIcon from "../../assets/icons/icon-black.png";
import PopUpWindow from "../../components/PopUpWindow";
import RulesModal from "../Modals/RulesModal";
import "./Misc.css";

const Header = () => {
  const { restartGame, showBorders, changeSettings, map } =
    useContext(gameContext);
  const [askForRestart, setAskForRestart] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const handleShowRules = () => {
    setShowRules(!showRules);
  };
  const handleAskForRestart = () => {
    setAskForRestart(!askForRestart);
  };
  return (
    <>
      <header>
        <img src={quizzerIcon} alt="GeoQuizzer Logo" className="logo" />
        <h2>GeoQuizzer</h2>
        <div className="header-options">
          {/* <TextButton activeWhen={null} onClick={nextGameState}>nextGameState</TextButton> //Testing only */}
          <TextButton
            activeWhen={null}
            onClick={() =>
              changeSettings({ map: map === "esri" ? "osm" : "esri", showBorders: map === "osm"})
            }
          >
            {map === "esri" ? "Open Street Map" : "Satellite"}
          </TextButton>
          <TextButton
            activeWhen={showBorders}
            disabled={map==='osm'}
            onClick={() => changeSettings({ showBorders: !showBorders })}
          >
            Borders
          </TextButton>
          <TextButton activeWhen={null} onClick={handleAskForRestart}>
            I want a restart!
          </TextButton>
          <TextButton
            activeWhen={showRules}
            onClick={handleShowRules}
          >
            Rules
          </TextButton>
        </div>
      </header>
      {askForRestart && (
        <PopUpWindow>
          <p>
            You want to restart the game? You will loose all your progress, but
            start with 20 credits again.
          </p>
          <button
            onClick={() => {
              handleAskForRestart();
              restartGame();
            }}
          >
            Restart
          </button>
          <button onClick={handleAskForRestart}>Keep playing</button>
        </PopUpWindow>
      )}
      {showRules && (
        <div className="overlay">
          <div className="modal-container intermediate-rules">
            <RulesModal onClick={handleShowRules} />
          </div>
        </div>
      )}
    </>
  );
};

Header.displayName = "Header";

export default Header;
