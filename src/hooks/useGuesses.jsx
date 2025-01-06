import haversine from "haversine-distance";
import { point, bearing } from "@turf/turf";

export const createGuessObject = (guessCoords, targetCoords, maxWinDistance, maxCompassDistance) => {
  let guess = {  };
  if (!guessCoords){
    guess = {
      distance: undefined,
      color: "darkgrey",
      coords: null,
      angleToTarget: null,
      win: false,
    }
  }else {
    let distance = getGuessToTargetDistance(guessCoords, targetCoords);
    let angle = getAngleToTarget(guessCoords, targetCoords);
    let bg = getBackgroundColor(distance);
    guess = {
      distance,
      coords: guessCoords,
      color: bg,
      angleToTarget: angle,
      win: distance <= maxWinDistance,
      showCompass: distance <= maxCompassDistance,
    };
  }
  return guess;
};

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
  let coords1 = point([guessCoords.lng, guessCoords.lat]);
  let coords2 = point([targetCoords.lng, targetCoords.lat]);
  return bearing(coords1, coords2);
};
