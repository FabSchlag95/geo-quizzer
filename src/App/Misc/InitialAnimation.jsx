import React, { useEffect } from "react";
import "./Misc.css";
import quizzerIcon from "../../assets/icons/quizzer-icon_secondary.png"

export default function InitialAnimation({nextGameState}) {

  useEffect(()=>{
    setTimeout(nextGameState,7000);
  },[nextGameState])

  return (
    <div className="scene">
      <div className="text" id="text-1">Geo </div>
      <div className="circle">
        <img className="mark" src={quizzerIcon}/>
      </div>
      <div className="text" id="text-2"> izzer</div>
    </div>
  );
}
