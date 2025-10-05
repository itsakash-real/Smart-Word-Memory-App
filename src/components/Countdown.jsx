import { convertMilliseconds, countdownIn24Hours } from "../utils";
import { useEffect, useState } from "react";
export default function Countdown(props) {
  const {handleChangePage, daysWords, datetime, day } = props
  const targetMillis = datetime || Date.UTC(1944, 2, 17, 12, 0, 0)
  const [remainingMs, setRemainingMs] = useState(countdownIn24Hours(targetMillis))
  console.log(remainingMs)

  const timer = convertMilliseconds(remainingMs)
  console.log(timer)

  return (
    <div className="card countdown-card">
      <h1 className="item-header">Day {1}</h1>
      <div className="today-container">
        <div>
          <p>Time remaining</p>
          <h3>{datetime ? `${Math.abs(timer.hours)}H ${Math.abs(timer.minutes)}M ${Math.abs(timer.seconds)}S` : '23H 59M 60S' }</h3>
        </div>
        <div>
          <p>Words for Today</p>
          <h3>{daysWords.length}</h3>
        </div>
      </div>

      <button onClick={() => { handleChangePage(2)}}  className="start-task">
        <h6>Start</h6>
      </button>
    </div>
  );
}
