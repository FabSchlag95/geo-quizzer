import React, { useCallback, useState } from 'react'
import haversine from "haversine-distance";
import { point, bearing } from '@turf/turf';

export default function useGuesses() {
  const [guesses, setGuesses] = useState([])
  const [latestGuess, setLatestGuess] = useState(null)
  
  const addGuess = useCallback((guessCoords, targetCoords) => {
    let guess = {"color":"lightgrey"}
    if(guessCoords){
        let distance = getGuessToTargetDistance(guessCoords, targetCoords)
        let angle = getAngleToTarget(guessCoords, targetCoords)
        let bg = getBackgroundColor(distance)
        guess = {distance,"coords":guessCoords,"color":bg,"angleToTarget":angle}
    }

    const guessesTemp = [...guesses]
    guessesTemp.push(guess)
    setGuesses(guessesTemp)
    setLatestGuess(guess)
  })
  const resetGuesses = useCallback(() => {
    setGuesses([])
  })
  return [latestGuess, guesses, addGuess, resetGuesses]
}

// Helper function to get the distance 
function getGuessToTargetDistance(guessCoords, targetCoords) {
  const distM = haversine(guessCoords, targetCoords); // gets the distance between two coordinates
  const distKm = Math.round(distM / 1000); //dist in kms
  return distKm;
}

// helper function to color guess bar depending on distance to target
const getBackgroundColor = (distance) => {
  if (!distance) return "darkgrey";
  const hue = distance < 2000 ? 128 : 13;
  const saturation =
    distance < 2000 ? distance / 40 + 50 : (20000 - distance) / 400 + 50;
  return `hsl(${hue},63%,${saturation}%)`;
};

// helper function to get the angle to the target location
const getAngleToTarget = (guessCoords, targetCoords) => {
  let coords1 = point([guessCoords.lng,guessCoords.lat])
  let coords2 = point([targetCoords.lng,targetCoords.lat])
  return bearing(coords1,coords2)
}