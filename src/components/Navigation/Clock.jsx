import { useContext, useEffect, useState } from "react";
import { gameContext } from "../../App";
import "./Navigation.css"

export default function Clock() {
  const { counter } = useContext(gameContext);
  const [alarm, setAlarm] = useState(false);

  useEffect(()=>{
    if(counter&&counter<=10)setAlarm(true);else setAlarm(false)
  },[counter])

  return <div className={`clock ${alarm ? "alarm" : ""}`}>{counter}</div>;
}