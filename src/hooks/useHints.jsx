import React, { useCallback, useState } from "react";

export default function useHints() {
  const [hints, setHints] = useState([]);
  const [activeHints, setActiveHints] = useState([]);
  
  const initializeHints = useCallback((currentItem)=>{
    setHints(currentItem.hints);
    setActiveHints([currentItem.hints[0]]);
  })
  
  const activateNextHint = useCallback(()=>{
    let temp = [...activeHints]
    temp.push(hints[temp.length])
    setActiveHints(temp);
  })

  return [activeHints,initializeHints, activateNextHint]
}
