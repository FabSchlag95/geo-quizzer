/**
 * InitialAnimation component
 *
 * This component displays an initial animation that gets played when the site is loaded.
 * It shows the text "Geo (animated Q ) izzer"
 * The animation lasts for 3 seconds before transitioning to the next game state.
 *
 * @component
 */
import React, { useEffect } from "react";
import "./Animation.css";
import quizzerIcon from "../../assets/icons/quizzer-icon-simple.png";

export default function InitialAnimation({ nextGameState }) {
  useEffect(() => {
    const timer = setTimeout(nextGameState, 3000);
    return () => clearTimeout(timer);
  }, [nextGameState]);

  return (
    <div className="scene">
      <div className="text" id="text-1">
        Geo{" "}
      </div>
      <div className="circle">
        <img className="mark" src={quizzerIcon} />
      </div>
      <div className="text" id="text-2">
        {" "}
        izzer
      </div>
    </div>
  );
}
