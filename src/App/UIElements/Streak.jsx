import React from 'react'

export default function Streak({itemsFound}) {
  return (
    <div className="global-points">
      <p className='hidden-text'>Current Streak: </p>
    <p>{itemsFound || 0} 🔥</p>
  </div>
  )
}
