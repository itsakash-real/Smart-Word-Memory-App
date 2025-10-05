import ProgressBar from './ProgressBar'
import { calcLevel, calculateAccuracy, calculateNewWords, PLAN } from '../utils/index.js'

export default function Stats(props) {
  const {name, day, attempts, PLAN} = props

  const currLvl = calcLevel(day)
  const floorLvl = Math.floor(currLvl)
  const remainder = (currLvl-floorLvl) * 100
  //const name = 'james'
  //const day = 16 //keeps track how long the user been using the app and what words there are particularly going to learn this day
  return (
    <div className="card stats-card">
      <div className="welcome-text">
        <h6>Welcome</h6>
        <h4 className="text-large">
          {name}
        </h4>
      </div>

      <div className="stats-column">
        <div>
          <p>Streak 🔥 </p>
          <h4>{day - 1}</h4> 
        </div>

        <div>
          <p>Word seen</p>
          <h4>{calculateNewWords(day-1)}</h4> 
        </div>

        <div>
          <p>Accuracy</p>
          <h4>{(calculateAccuracy(attempts, day)*100).toFixed(1)}</h4> 
        </div>
      </div>

      <ProgressBar text={`lvl ${floorLvl}`} remainder={remainder} />

    </div>
  );
}
