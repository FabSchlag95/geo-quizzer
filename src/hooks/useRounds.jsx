import React, { useState } from 'react'

export default function useRounds(maxRound) {
  const [round, setRound] = useState(0);

  function nextRound() {
    setRound(round+1)
  }
  function resetRound() {
    setRound(0)
  }
  return [round, nextRound, resetRound]
}
