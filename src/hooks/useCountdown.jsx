/**
 * Custom hook to create a countdown timer.
 * @hook
 * 
 * @param {number} limit - The starting value for the countdown.
 * @returns {[number, function]} - An array containing the current counter value and the countdown function.
 */

import { useCallback, useState } from "react";

export default function useCountdown(limit) {
  const [counter, setCounter] = useState(limit);

  const countdown = useCallback(() => {
    let timer = null;
    if (counter > 0) {
      timer = setTimeout(() => {
        setCounter(counter - 1);
      }, 1000);
    }
    return () => clearTimeout(timer); // return function to clear Time out to avoid side effects
  }, [counter]);

  return [counter, countdown];
}
