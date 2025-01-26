
/**
 * Custom hook to manage hints for a given item.
 * Sets the active hints which is triggered by the activateNextHint function
 */

import { useCallback, useEffect, useState } from "react";

export default function useHints(currentItem) {
  const [hints, setHints] = useState([]);
  const [activeHints, setActiveHints] = useState([]);
 
  // when currentItem is loaded, hints are retrieved
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
