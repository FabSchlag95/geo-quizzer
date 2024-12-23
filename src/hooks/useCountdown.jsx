import React, { useCallback, useEffect, useState } from 'react'


export default function useCountdown(limit) {
    let timer = 0
    const [counter, setCounter] = useState(limit)
    const [isRunning,setIsRunning] = useState(false)

    useEffect(() => {
        if (isRunning && counter && counter > 0) {
          timer = setTimeout(() => setCounter((c) => c - 1), 1000);
        } else if (isRunning && counter){
            setIsRunning(false)
            setCounter(limit)
        }
        return () => clearTimeout(timer); // return function to clear Time out to avoid side effects
      }, [counter,isRunning]);
    
    const startCountdown = useCallback(() => {
        setIsRunning(true)
    },[isRunning])

    const resetCountDown = useCallback(() => {
        setIsRunning(false)
        setCounter(limit)
    },[setCounter,isRunning])
    
    return [counter,startCountdown,resetCountDown]
}
