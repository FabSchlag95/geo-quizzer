/**
 * Custom hook to manage game states and actions.
 * Wherever it was possible, I put algorithmic game changes in here.
 *
 * @hook
 * 
 * @property {Object} initialGameState -a structured object with all default values and pres settings for the game logic
 * 
 * @returns {Object} - The game state and functions to manage the game.
 * @property {Object} state - The current game state.
 * @property {Function} nextGameState - Function to transition to the next game state.
 * @property {Function} restartGame - Function to restart the game.
 * @property {Function} changeSettings - Function to change game settings.
 * @property {Function} activateNextHint - Function to activate the next hint.
 * @property {Function} activateSpareGuess - Function to activate a free guess.
 * @property {Function} activateCompass - Function to activate the compass for certain guess.
 */

import { useEffect, useReducer } from "react";
import { createGuessObject } from "./useGuesses";
import gameData from "../assets/gameData.json";

const initialGameState = {
  // pre game settings
  maps: {
    esri: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png",
    osm: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  },
  roundTime: 300,
  maxWinDistance: 50,
  maxCompassDistance: 5000, // must be low due to errors of harvesine api
  hintPrice: 7,
  guessPrice: 10,
  compassPrice: 15,
  maxGuesses: 5,
  // constant data
  rules: gameData.rules,
  allItems: gameData.items,
  notPlayedItems: gameData.items,
  // variable data
  activeHints: [],
  guesses: [],
  currentItem: null,
  previousMarker: [],
  tempCoords: null,
  lastGuess: null,
  coordsToGo: null,
  // flags
  stateName: "INITIAL",
  showBorders: true,
  currentScreen: "",
  win: false,
  map: "esri",
  // scoring and joker
  credits: 20,
  itemsFound: 0,
  spareGuesses: 3,
};

export default function useGameStates() {
  /**
   * Reducer function to manage the game state transitions based on the action type which is the game state identifier.
   *
   * @param {Object} state - The current state of the game.
   * @param {Object} action - The action object containing the type and any additional data.
   * @returns {Object} The new state of the game after applying the game state values.
   */
  function gameStateReducer(state, action) {

    if (action.type) {
      state.stateName = action.type;
      if (action.type === "INITIAL") {
        return { ...state };
      } else if (action.type === "INFO") {
        return { ...state, currentScreen: "INFO" };
      } else if (action.type === "START_ROUND") {
        const [currentItem, notPlayedItems] = nextRandomItem(
          state.notPlayedItems?.length
            ? state.notPlayedItems
            : initialGameState.notPlayedItems
        );
        return {
          ...state,
          currentItem,
          creditsWon: 0,
          currentScreen: null,
          notPlayedItems,
          activeHints: [],
          lastGuess: null,
          guesses: [],
          spareGuesses: state.spareGuesses > 3 ? state.spareGuesses : 3,
          previousMarker: [],
        };
      } else if (action.type === "HINT") {
        const tempCoords = null;
        const activeHints = state.currentItem.hints.slice(
          0,
          state.activeHints.length + 1
        );
        return {
          ...state,
          currentScreen: "HINT",
          activeHints,
          tempCoords,
        };
      } else if (action.type === "GUESSING") {
        return {
          ...state,
          tempCoords: null,
          currentScreen: null,
        };
      } else if (action.type === "GUESS_RESULT") {
        const guess = createGuessObject(
          state.tempCoords,
          state.currentItem.target.coords,
          state.maxWinDistance,
          state.maxCompassDistance
        );
        const spareGuesses = state.spareGuesses - 1;
        const win = guess.win;
        const creditsWon = Math.round(5 + state.currentItem?.difficulty * 5);
        return {
          ...state,
          guesses: [...state.guesses, guess],
          spareGuesses: spareGuesses,
          win,
          creditsWon,
          lastGuess: (!spareGuesses || win) && guess,
          currentScreen: !win && spareGuesses ? "GUESS_RESULT" : "END_SCREEN",
          ...(win && {
            credits: state.credits + creditsWon,
            itemsFound: state.itemsFound + 1,
          }),
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
      "START_ROUND",
      "HINT",
      "GUESSING",
      "GUESS_RESULT",
    ];
    const currentStateIndex = states.findIndex((e) => e === state.stateName);

    if (state.stateName === "GUESSING")
      dispatch({ type: "GUESS_RESULT", payload });
    else if (state.stateName === "GUESS_RESULT" && state.spareGuesses) {
      if (state.spareGuesses) dispatch({ type: "GUESSING" });
      else dispatch({ type: "START_ROUND" });
    } else dispatch({ type: states[currentStateIndex + 1] });
  };

  // reset the game state to beginning state
  const restartGame = (win) => {
    changeSettings(win ? {}:{ credits: 20, itemsFound: 0 });
    dispatch({ type: "START_ROUND" });
  };

  const changeSettings = (newSettings) => {
    dispatch({ settings: newSettings });
  };

  const activateNextHint = () => {
    dispatch({ type: "HINT" });
    changeSettings({ credits: state.credits - state.hintPrice });
  };

  const activateSpareGuess = () => {
    changeSettings({
      credits: state.credits - state.guessPrice,
      spareGuesses: state.spareGuesses + 1,
    });
  };

  const activateCompass = (guess) => {
    changeSettings({
      credits: state.credits - state.compassPrice,
      previousMarker: [...state.previousMarker, guess],
    });
  };

  useEffect(() => {
    // automatically go to the next state when being in START_ROUND state
    if (state.stateName == "START_ROUND") dispatch({ type: "HINT" });
    if (state.currentScreen) changeSettings({ showRules: false });
  }, [state?.currentScreen, state?.stateName]);

  return {
    state,
    nextGameState,
    restartGame,
    changeSettings,
    activateNextHint,
    activateSpareGuess,
    activateCompass,
  };
}

// helper function to get a new random target-hints item.
function nextRandomItem(notPlayedItems) {
  const randomNum = Math.floor(Math.random() * notPlayedItems.length);
  const item = notPlayedItems[randomNum];
  notPlayedItems = notPlayedItems.filter((e) => e !== item);
  return [item, notPlayedItems];
}
