import React, { useState, useEffect } from "react"
import options from "../Utils/options"

function SuperSeven() {
  const [lines, setLines] = useState(5)
  const [credits, setCredits] = useState(0)
  const [totalBet, setTotalBet] = useState(0)
  const [gameBet, setGameBet] = useState(0)
  const [gain, setGain] = useState(0)

  console.log(options.base_reels[0])

  const randomizer = (data) => {
    const count = 3
    const result = []

    for (let i = 0; i < count; i += 1) {
      const randomIndex = Math.floor(Math.random() * data.length)
      const randomNumber = data[randomIndex]
      result.push(randomNumber)
    }

    console.log(result)
  }

  randomizer(options.base_reels[0])

  return (
    <>
      <div>
        <input value={lines}></input>
        <input value={credits}></input>
        <input value={totalBet}></input>
        <input value={gameBet}></input>
        <input value={gain}></input>
      </div>

      <div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div>
        <button>Start</button>
        <button>AutoStart</button>
      </div>
    </>
  )
}

export default SuperSeven
