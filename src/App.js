import { useState, useEffect } from 'react'
import SingleCard from './components/SingleCard'
import './App.css'

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false },
]

function App() {

  const[cards, setCards] = useState([])
  const[turns, setTurns] = useState(0)
  const[choiceOne, setChoiceOne] = useState(null)
  const[choiceTwo, setChoiceTwo] = useState(null)
  const[disable,setDisable] = useState(false)

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ... cardImages]
    .sort(()=>Math.random() - 0.5)
    .map((card)=>({...card, id: Math.random() }))
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  // handle a choice
  const handleChoice = (card) => {
    !choiceOne ? setChoiceOne(card) : setChoiceTwo(card)
  }

  // compare the choice
  const compareChoice = () =>{
    if (choiceOne != null && choiceTwo !=null){
      setDisable(true)
      if (choiceOne.src == choiceTwo.src){
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src){
              return {...card, matched:true}
            }else{
              return card
            }
          })
        })
        resetTurn()
      }else{
        setTimeout(() => resetTurn(), 1000) 
      }
    }
  }

  useEffect(() =>{
    compareChoice()
  },[choiceOne,choiceTwo])


  // reset choices && increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisable(false)
  }

  // auto start the game
  useEffect(() =>{
    shuffleCards()
  },[])

  console.log(cards)



  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

    <div className='card-grid'>
        {
          cards.map((card) => (
            <SingleCard key={card.id} 
            card={card}
            handleChoice = {handleChoice}
            flipped = { card === choiceOne || card === choiceTwo || card.matched }
            disable = {disable}
            />
          ))}
      </div>

      <p>turns: {turns}</p>

    </div>
  );
}

export default App