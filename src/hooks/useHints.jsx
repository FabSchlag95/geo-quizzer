import React, { useState } from "react";

export default function useHints() {
  const [hints, setHints] = useState([]);
  const [activeHints, setActiveHints] = useState([]);
  
  function initializeHints(currentItem) {
    setHints(currentItem.hints);
    setActiveHints([currentItem.hints[0]]);
  }
  
  function activateNextHint() {
    let temp = [...activeHints]
    temp.push(hints[temp.length])
    setActiveHints(temp);
  }

  return [activeHints,initializeHints, activateNextHint]
}
