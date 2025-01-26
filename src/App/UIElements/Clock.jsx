/**
 * Clock component that displays a countdown timer.
 * 
 * This component uses the `useCountdown` hook to manage the countdown timer
 * and the `gameContext` to get the round time and the nextGameState function.
 * 
 * @component
 */

import { useContext, useEffect, useState } from "react";
import useCountdown from "../../hooks/useCountdown";
import { gameContext } from "../contexts";

export default function Clock() {
  const { roundTime, nextGameState } = useContext(gameContext);
  const [alarm, setAlarm] = useState(false);
  const [counter, countdown] = useCountdown(roundTime);

  useEffect(() => {
    countdown();
    if (counter && counter <= 10) setAlarm(true);
    else setAlarm(false);
    if (counter === 0) nextGameState();
  }, [countdown, counter, nextGameState]);

  return (
    <div className="clock" id={alarm ? "alarm" : ""}>
      {formatCounter(counter)}
    </div>
  );
}

// helper function to get the seconds as mm:ss
const formatCounter = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
};
