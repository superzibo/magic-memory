import React from 'react'
import "./SingleCard.css"

export default function Card( { card, handleChoice, flipped, disable } ) {

  const handleClick = () => {
    if (!disable){
      handleChoice(card)
    }
  }

  return (
        <div className='card' key={card.id}>
            <div className={ flipped ? "flipped" : "" }>
              <img className='front' src={card.src} alt="card front" />
              <img className='back' src="/img/cover.png" alt="card back" onClick={handleClick} />
            </div>
        </div>
  )
}
