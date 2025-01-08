import { useEffect, useReducer } from "react";
import { createGuessObject } from "./useGuesses";
/**
 * MaxRounds = 5;
 */

export default function useGameStates(gameState) {
  function gameStateReducer(state, action) {
    if (action.type){
      state.stateName = action.type;
      state.previousScreen = action.previousScreen || "";
      if (action.type === "INITIAL") {
        return {
          ...state,
        };
      } else if (action.type === "INFO") {
        return { ...state, currentScreen: "INFO" };
      } else if (action.type === "START_ROUND") {
        const [currentItem, notPlayedItems] = nextRandomItem(
          gameState.notPlayedItems
        );
        const guesses = [];
        const activeHints = [];
        const round = 0;
        return {
          ...state,
          currentItem,
          currentScreen: null,
          notPlayedItems,
          activeHints,
          guesses,
          round,
        };
      } else if (action.type === "HINT") {
        const previousMarker = null;
        const tempCoords = null;
        const round = state.round <= state.maxRounds ? state.round + 1 : 1;
        const activeHints = state.currentItem.hints.slice(0, round);
        return { ...state, currentScreen: "HINT", round, activeHints, tempCoords, previousMarker };
      } else if (action.type === "GUESSING") {
        return { ...state, currentScreen: null };
      } else if (action.type === "GUESS_RESULT") {
        const guess = createGuessObject(state.tempCoords, state.currentItem.target.coords,state.maxWinDistance, state.maxCompassDistance);
        const guesses = [...state.guesses, guess];
        const win = guess.win;
        return { ...state, guesses, win, currentScreen: "GUESS_RESULT" };
      } else if (action.type === "ROUND_RESULT") {
        const roundPoints = (6 - state.round) * 10;
        const globalPoints = state.globalPoints + roundPoints;
        return {
          ...state,
          currentScreen: "END_SCREEN",
          roundPoints,
          globalPoints,
        };
      }
    } else if(action.settings){
        return {...state, ...action.settings}
    }
  }

  const [state, dispatch] = useReducer(gameStateReducer, gameState);

  // automatic dispatcher for subsequent states and game loop
  const nextGameState = (payload = null) => {
    const states = [
      "INITIAL",
      "INFO",
      "START_ROUND",
      "HINT",
      "GUESSING",
      "GUESS_RESULT",
      "ROUND_RESULT",
    ];
    const currentStateIndex = states.findIndex((e) => e === state.stateName);

    if (state.stateName === "GUESS_RESULT" && state.round <= state.maxRounds)
      dispatch({ type: "HINT" });
    else if (state.stateName === "ROUND_RESULT")
      dispatch({ type: "START_ROUND" });
    else if (state.stateName === "GUESSING")
      dispatch({ type: "GUESS_RESULT", payload });
    else dispatch({ type: states[currentStateIndex + 1] });
  };

  // toggle rules screen
  const toggleRules = () => {
    changeSettings({showRules: !state.showRules})
  };

  // reset the game state to beginning state
  const restartGame = () => {
    dispatch({ type: "START_ROUND" });
  };

  const changeSettings = (newSettings) => {
    dispatch({settings:newSettings})
  }

  useEffect(() => {
    // automatically go to the next state when being in start_round state
    if (state.stateName == "START_ROUND") dispatch({ type: "HINT" });
    // skip to the round result when round is over
    if (state.stateName == "GUESS_RESULT" && (state.round>state.maxRounds||state.win)) dispatch({type:"ROUND_RESULT"});
    // when there is an intermediate screen, disable rules
    if (state.currentScreen) changeSettings({showRules:false});
  }, [state]);

  return [state, nextGameState, toggleRules, restartGame, changeSettings];
}

// helper function to get a new random location-hints item.
function nextRandomItem(notPlayedItems) {
  const randomNum = Math.floor(Math.random() * notPlayedItems.length);
  const item = notPlayedItems[randomNum];
  notPlayedItems = notPlayedItems.filter((e) => e !== item);
  return [item, notPlayedItems];
}
