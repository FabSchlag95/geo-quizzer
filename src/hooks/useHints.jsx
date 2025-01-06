import React, { useCallback, useEffect, useState } from "react";

export default function useHints(currentItem) {
  const [hints, setHints] = useState([]);
  const [activeHints, setActiveHints] = useState([]);
 
  useEffect(()=>{
    if(currentItem){
      setHints(currentItem.hints);
      setActiveHints([currentItem.hints[0]]);
    }
  },[currentItem])
  
  const activateNextHint = useCallback(()=>{
    let temp = [...activeHints]
    temp.push(hints[temp.length])
    setActiveHints(temp);
  },[hints,activeHints])

  return [activeHints, activateNextHint]
}
