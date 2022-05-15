import React, { useState, useEffect } from "react"
import options from "../Utils/options"
import Drum from "../Drum/Drum"
import styles from "./SuperSeven.module.css"
import { v4 as uuidv4 } from "uuid"

function SuperSeven() {
  const [lines, setLines] = useState(5)
  const [credits, setCredits] = useState(10000)
  const [gameBet, setGameBet] = useState(100)
  const [totalBet, setTotalBet] = useState(0)
  const [gain, setGain] = useState(0)
  const [gameOn, setGameOn] = useState(false)
  const [drumsData, setDrumsData] = useState({})
  const [gainData, setGainData] = useState(0)
  const [changedPids, setChangedPids] = useState({})
  const [gameOver, setGameOver] = useState(false)

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
    setGain(0)
    setGainData(0)
    let numberOfIndex = 0
    const gainElements = []
    let gain = ""
    const analysis = Object.values(drumsData)

   

    const recursion = (arr, index) => {
      for (let i = 0; i < arr.length; i += 1) {
        if (gain === "") {
          gain = arr[i][index]
          continue
        }

        if (arr[i][index] === gain && i + 1 !== arr.length) {
          continue
        }

        if (arr[i][index] !== gain) {
          gain = ""
          numberOfIndex += 1
          recursion(analysis, numberOfIndex)
          break
        }

        if (arr[i][index] && arr[i][index] === gain && i + 1 === arr.length) {
          gainElements.push(gain)
          gain = ""
          numberOfIndex += 1
          recursion(analysis, numberOfIndex)
          break
        }
      }
    }
    recursion(analysis, numberOfIndex)

    const gainSum = []
    const increaseCredits = []

    gainElements.map((element) => {
      gainSum.push(options.gain[element])
    })

    if (gainSum.length === 0 && credits > 0) {
      setCredits(credits - totalBet)
    }

    if (credits === 0 || credits<0) {
      setGameOver(true)
      return
    }

    if (gainSum.length > 0) {
      gainSum.map((element) => {
        increaseCredits.push(element * gameBet)
      })

      if (increaseCredits.length > 0) {
        increaseCredits.reduce((acc, current) => {
          acc = acc + current
          setGain(acc)
          setCredits(credits + acc)
          return acc
        }, 0)
      }
    }
  }

  const startGame = () => {
    setGameOn(!gameOn)

    options.base_reels.map((arr) => {
      const index = options.base_reels.indexOf(arr)
      drumsData[`${index}`] = randomizer(arr)
    })

    countGain()
    return 1
  }

  const restartGame = () => {
    setGameOver(false)
    setGameOn(!gameOn)
    setCredits(1000)
    setGameBet(100)
    setDrumsData({})
  }


  const autoStart = (func, count) => {
func()
  }

  return (
    <div className={styles.Parent}>
      <div className={styles.Container}>
        {gameOver ? (
          <div className={styles.ButtonsReStartDiv}>
            <p>GameOver! Out of credits.</p>
            <button className={styles.RestartGameButton} onClick={restartGame}>
              Restart Game
            </button>
          </div>
        ) : (
          <div className={styles.DrumsAndInputs}>
            <div className={styles.SuperSeven}>
              {Object.keys(drumsData).length === 0 ? (
                <>
                  <Drum key={uuidv4()} data={["LUCK", "LUCK", "LUCK"]}></Drum>
                  <Drum key={uuidv4()} data={["LUCK", "LUCK", "LUCK"]}></Drum>
                  <Drum key={uuidv4()} data={["LUCK", "LUCK", "LUCK"]}></Drum>
                </>
              ) : (
                Object.values(drumsData).map((arr) => {
                  return <Drum key={uuidv4()} data={arr}></Drum>
                })
              )}
            </div>

            <div className={styles.InputsDiv}>
              <div className={styles.InputDiv}>
                <span>LINES</span>
                <div>
                  <button className={styles.ButtonInInputs} onClick={decreaseLines}>
                    -
                  </button>
                  <input readOnly value={lines}></input>
                  <button className={`${styles.ButtonInInputs} ${styles.IncreaseButton}`} onClick={increaseLines}>
                    +
                  </button>
                </div>
              </div>
              <div className={styles.InputDiv}>
                <span>GAMEBET</span>
                <div>
                  <button className={styles.ButtonInInputs} onClick={decreaseBet}>
                    -
                  </button>
                  <input readOnly value={gameBet}></input>
                  <button className={`${styles.ButtonInInputs} ${styles.IncreaseButton}`} onClick={increaseBet}>
                    +
                  </button>
                </div>
              </div>
              <div className={styles.InputDiv}>
                <span>CREDITS</span>
                <input readOnly value={credits}></input>
              </div>
              <div className={styles.InputDiv}>
                <span>TOTALBET</span>
                <input readOnly value={totalBet}></input>
              </div>
              <div className={styles.InputDiv}>
                <span>GAIN</span>
                <input readOnly value={gain}></input>
              </div>
            </div>

            <div className={styles.ButtonsStartDiv}>
              <button className={styles.ButtonStart} onClick={startGame}>
                Start
              </button>
              <button className={styles.ButtonStart} onClick={() => autoStart(startGame, 10)}>
                AutoStart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SuperSeven

// credits / totalBet