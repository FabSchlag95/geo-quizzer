import { useEffect, useReducer } from "react";
import { createGuessObject } from "./useGuesses";
import gameData from "../assets/gameData.json";

const initialGameState = {
  // pre game settings
  roundTime: 60,
  maxWinDistance: 50,
  maxCompassDistance: 2000,
  // constant data
  rules: gameData.rules,
  allItems: gameData.items,
  notPlayedItems: gameData.items,
  // variable data
  activeHints: [],
  guesses: [],
  currentItem: null,
  previousMarker: null,
  tempCoords: null,
  lastGuess: null,
  // flags
  stateName: "INITIAL",
  showBorders: true,
  currentScreen: "",
  win: false,
  showRules: false,
  // variables
  maxRounds: 1,
  round: 0,
  globalPoints: 0,
  roundPoints: 0,
};

export default function useGameStates() {
  function gameStateReducer(state, action) {
    if (action.type) {
      state.stateName = action.type;
      if (action.type === "INITIAL") {
        return {
          ...state,
        };
      } else if (action.type === "INFO") {
        return { ...state, currentScreen: "INFO" };
      } else if (action.type === "START_SESSION") {
        const [currentItem, notPlayedItems] = nextRandomItem(
          initialGameState.notPlayedItems
        );
        const maxRounds = currentItem?.hints?.length || 0;
        const guesses = [];
        const activeHints = [];
        const round = 0;
        return {
          ...state,
          currentItem,
          currentScreen: null,
          notPlayedItems,
          activeHints,
          lastGuess: null,
          guesses,
          round,
          maxRounds,
        };
      } else if (action.type === "HINT") {
        const previousMarker = null;
        const tempCoords = null;
        const round = state.round < state.maxRounds ? state.round + 1 : 1;
        const activeHints = state.currentItem.hints.slice(0, round);
        return {
          ...state,
          currentScreen: "HINT",
          round,
          activeHints,
          tempCoords,
          previousMarker,
        };
      } else if (action.type === "GUESSING") {
        return { ...state, currentScreen: null };
      } else if (action.type === "GUESS_RESULT") {
        const guess = createGuessObject(
          state.tempCoords,
          state.currentItem.target.coords,
          state.maxWinDistance,
          state.maxCompassDistance
        );
        const guesses = [...state.guesses, guess];
        const win = guess.win;
        return { ...state, guesses, win, currentScreen: "GUESS_RESULT" };
      } else if (action.type === "SESSION_RESULT") {
        const lastGuess = state.guesses.splice(-1, 1)[0];
        const roundPoints = (state.maxRounds - state.round + 1) * 10;
        const globalPoints = state.win ? state.globalPoints + roundPoints : 0;

        return {
          ...state,
          currentScreen: "END_SCREEN",
          roundPoints,
          globalPoints,
          lastGuess,
        };
      }
    } else if (action.settings) {
      return { ...state, ...action.settings };
    }
  }

  const [state, dispatch] = useReducer(gameStateReducer, initialGameState);

  // automatic dispatcher for subsequent states and game loop
  const nextGameState = (payload = null) => {
    const states = [
      "INITIAL",
      "INFO",
      "START_SESSION",
      "HINT",
      "GUESSING",
      "GUESS_RESULT",
      "SESSION_RESULT",
    ];
    const currentStateIndex = states.findIndex((e) => e === state.stateName);

    if (state.stateName === "GUESS_RESULT" && state.round < state.maxRounds)
      dispatch({ type: "HINT" });
    else if (state.stateName === "SESSION_RESULT")
      dispatch({ type: "START_SESSION" });
    else if (state.stateName === "GUESSING")
      dispatch({ type: "GUESS_RESULT", payload });
    else dispatch({ type: states[currentStateIndex + 1] });
  };

  // toggle rules screen
  const toggleRules = () => {
    changeSettings({ showRules: !state.showRules });
  };

  // reset the game state to beginning state
  const restartGame = () => {
    dispatch({ type: "START_SESSION" });
  };

  const changeSettings = (newSettings) => {
    dispatch({ settings: newSettings });
  };

  useEffect(() => {
    // automatically go to the next state when being in START_SESSION state
    if (state.stateName == "START_SESSION") dispatch({ type: "HINT" });
    // skip to the round result when round is over
    if (
      state.stateName == "GUESS_RESULT" &&
      (state.round >= state.maxRounds || state.win)
    )
      dispatch({ type: "SESSION_RESULT" });
    // when there is an intermediate screen, disable rules
    if (state.currentScreen) changeSettings({ showRules: false });
  }, [
    state.currentScreen,
    state.maxRounds,
    state.round,
    state.stateName,
    state.win,
  ]);

  return [state, nextGameState, toggleRules, restartGame, changeSettings];
}

// helper function to get a new random target-hints item.
function nextRandomItem(notPlayedItems) {
  const randomNum = Math.floor(Math.random() * notPlayedItems.length);
  const item = notPlayedItems[randomNum];
  notPlayedItems = notPlayedItems.filter((e) => e !== item);
  return [item, notPlayedItems];
}
