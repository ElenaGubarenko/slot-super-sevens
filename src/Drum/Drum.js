import styles from "./Drum.module.css"
import options from "../Utils/options"
import { v4 as uuidv4 } from "uuid"

function Drum(data) {
  return (
    <div className={styles.Drum}>
      {data.data.map((element) => {
        return <div className={styles.DrumElement} key={uuidv4()}>{options.coloredPids[element]}</div>
      })}
    </div>
  )
}

export default Drum
