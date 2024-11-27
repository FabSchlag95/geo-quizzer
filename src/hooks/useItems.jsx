import React, { useCallback, useEffect, useState } from 'react'

export default function useItems(items) {
  const [notPlayed, setNotPlayed] = useState(items)
  const [currentItem, setCurrentItem] = useState()
  
  // initialize a random item at start
  useEffect(()=>{
    if(!currentItem)nextRandomItem()
  },[])

  const nextRandomItem = useCallback(()=>{
    const randomNum = Math.floor(Math.random()*notPlayed.length)
    const current = notPlayed[randomNum]
    setCurrentItem(current)
    let temp = notPlayed.filter((e,i)=>i !== randomNum)
    setNotPlayed(temp.length?temp:items.filter((e)=>e!=current))
  })
  
  return [currentItem, nextRandomItem]
}
