import React, { useState } from 'react'

const gameStates = [
    "initial",
    "show hint",
    "set a guess",
    "round end/guess screen",
    "win/loose",
    "reset"
]

export default function useGameState(firstState,currentRound) {
    const [gameState,setGameState] = useState(0) // 0 will be handled as the initial state, only called when page is freshly opened

    function nextGameState() {
        if(gameStates.length>(gameState+1)){
            if(gameState==3 && currentRound<5)setGameState(1);
            else setGameState(gameState+1);
        } else setGameState(firstState+1);
    }

    return [gameState,setGameState,nextGameState]
}
