import React, { useState, useEffect } from "react"
import options from "../Utils/options"
import Drum from "../Drum/Drum"
import styles from "./SuperSeven.module.css"
import { v4 as uuidv4 } from "uuid"

function SuperSeven() {
  const [lines, setLines] = useState(5)
  const [credits, setCredits] = useState(1000)
  const [gameBet, setGameBet] = useState(100)
  const [totalBet, setTotalBet] = useState(0)
  const [gain, setGain] = useState(0)
  const [gameOn, setGameOn] = useState(false)
  const [drumsData, setDrumsData] = useState({})
  const [gainData, setGainData] = useState([])
  const [changedPids, setChangedPids] = useState({})

  useEffect(() => {
    const changedOptions = options.pids

    Object.entries(changedOptions).reduce((acc, [value, key]) => {
      acc[key] = value
      setChangedPids(acc)
      return acc
    }, {})
  }, [])

  const randomizer = (data) => {
    const count = 3
    const result = []

    for (let i = 0; i < count; i += 1) {
      const randomIndex = Math.floor(Math.random() * data.length)
      const randomNumber = data[randomIndex]
      const randomFruit = changedPids[randomNumber]
      // console.log(changedPids[randomNumber])
      result.push(randomFruit)
    }

    return result
  }

  useEffect(() => {
    setTotalBet(lines * gameBet)
  }, [lines, gameBet])

  const increaseLines = () => {
    lines >= 50 ? console.log("too much lines") : setLines(lines + 5)
  }

  const decreaseLines = () => {
    lines <= 0 ? console.log("zero lines") : setLines(lines - 5)
  }

  const increaseBet = () => {
    gameBet >= 1000 ? console.log("too much bet") : setGameBet(gameBet + 100)
  }

  const decreaseBet = () => {
    gameBet <= 0 ? console.log("zero bet") : setGameBet(gameBet - 100)
  }

  const countGain = () => {
    const dataToAnalysis = Object.values(drumsData)

    let newArr = []

    dataToAnalysis.reduce((acc, current) => {
      newArr = [...newArr, ...current]

      if (newArr[0] === newArr[3] && newArr[3] === newArr[6]) {
        acc.push(newArr[0])
      }

      if (newArr[1] === newArr[4] && newArr[4] === newArr[7]) {
        acc.push(newArr[1])
      }

      if (newArr[2] === newArr[5] && newArr[5] === newArr[8]) {
        acc.push(newArr[2])
      }

      setGainData([...acc])
      return acc
      // if (acc && acc.length !== 0) {
      //   setGainData([...acc])
      // }
    }, [])

    console.log(newArr)

    console.log(gainData)

    if (gainData.length !== 0) {
      gainData.map((element) => {})
    }
  }

  // console.log(gainData)

  const startGame = () => {
    setGameOn(!gameOn)

    options.base_reels.map((arr) => {
      const index = options.base_reels.indexOf(arr)
      drumsData[`${index}`] = randomizer(arr)
    })

    countGain()
  }

  return (
    <>
      <div>
        <label>
          <button onClick={decreaseLines}>-</button>
          <input readOnly value={lines}></input>
          <button onClick={increaseLines}>+</button>
        </label>
        <label>
          <button onClick={decreaseBet}>-</button> <input readOnly value={gameBet}></input>
          <button onClick={increaseBet}>+</button>
        </label>
        <input readOnly value={credits}></input>
        <input readOnly value={totalBet}></input>

        <input readOnly value={gain}></input>
      </div>

      <div className={styles.SuperSeven}>
        {Object.keys(drumsData).length === 0 ? (
          <>
            <Drum key={uuidv4()} data={["START", "START", "START"]}></Drum>
            <Drum key={uuidv4()} data={["START", "START", "START"]}></Drum>
            <Drum key={uuidv4()} data={["START", "START", "START"]}></Drum>
          </>
        ) : (
          Object.values(drumsData).map((arr) => {
            return <Drum key={uuidv4()} data={arr}></Drum>
          })
        )}
      </div>
      <div>
        <button onClick={startGame}>Start</button>
        <button>AutoStart</button>
      </div>
    </>
  )
}

export default SuperSeven
