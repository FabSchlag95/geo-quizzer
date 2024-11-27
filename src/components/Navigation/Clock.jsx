import { useEffect, useState } from "react";
import "./Navigation.css"

export default function Clock({ counter }) {
  const [alarm, setAlarm] = useState(false);

  useEffect(()=>{
    if(counter&&counter<=10)setAlarm(true);else setAlarm(false)
  },[counter])

  return <div className={`clock ${alarm ? "alarm" : ""}`}>{counter}</div>;
}