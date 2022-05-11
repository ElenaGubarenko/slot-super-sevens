import styles from "./Drum.module.css"
import { v4 as uuidv4 } from "uuid"

function Drum(data) {
  // console.log(data)
  return (
    <>
      <div className={styles.Drum}>
        {data.data.map((element) => {
          return <div key={uuidv4()}>{element}</div>
        })}
      </div>
    </>
  )
}

export default Drum
