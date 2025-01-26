/**
 * Streak component displays the current streak of items found in the game.
 * (If user does not get a location streak is set to 0;)
 * 
 * @component
 */

import { useContext } from 'react'
import { gameContext } from '../contexts'

export default function Streak() {
  const {itemsFound} = useContext(gameContext);
  return (
    <div className="global-points">
      <p className='hidden-text'>Current Streak: </p>
    <p>{itemsFound || 0} 🔥</p>
  </div>
  )
}
