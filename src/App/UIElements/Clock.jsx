import { useEffect, useState } from "react";
import useCountdown from "../../hooks/useCountdown";

export default function Clock({roundTime, onCountdownFinished}) {
  const [alarm, setAlarm] = useState(false);
  const [counter, countdown] = useCountdown(roundTime);

  useEffect(()=>{
    countdown()
    if(counter&&counter<=10)setAlarm(true);else setAlarm(false)
    if(counter === 0) onCountdownFinished();
  },[countdown, counter, onCountdownFinished])

  return <div className="clock" id={alarm?"alarm":""}>{counter}</div>;
}