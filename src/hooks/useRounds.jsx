import React, { useCallback, useState } from 'react'

export default function useRounds() {
  const [round, setRound] = useState(0);

  const nextRound = useCallback(()=>{
    setRound(round+1)
  })
  const resetRound = useCallback(()=>{
    setRound(0)
  })
  return [round, nextRound, resetRound]
}
