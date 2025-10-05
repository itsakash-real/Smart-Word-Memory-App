import { useState } from "react";
import { isEncountered, shuffle } from "../../utils";
import ProgressBar from "../ProgressBar";
import DEFINITION from "../../utils/VOCAB.json";

export default function Challenge(props) {
  const {
    day,
    daysWords,
    handleChange,
    handleChangePage,
    handleIncrementAttempts,
    handleCompleteDay,
    PLAN,
  } = props;

  const [wordIndex, setWordIndex] = useState(0);
  const [inputVal, setInputVal] = useState("");
  const [showDefinition, setDefinition] = useState(false);
  const [listToLearn, setListToLearn] = useState([
    ...daysWords,
    ...shuffle(daysWords),
    ...shuffle(daysWords),
    ...shuffle(daysWords),
  ]);
  
  // Track original length for progress calculation
  const [originalLength] = useState(listToLearn.length);
  const [completedWords, setCompletedWords] = useState(0);

  const word = listToLearn[wordIndex];
  const isNewWord = showDefinition || (!isEncountered(day, word) && wordIndex < daysWords.length);
  const definition = DEFINITION[word];

  function giveup() {
    // Add word back to the end for review
    setListToLearn([...listToLearn, word]); 
    
    // Move to next word
    moveToNextWord();
    
    // Increment attempts counter
    handleIncrementAttempts();
  }

  function moveToNextWord() {
    const nextIndex = wordIndex + 1;
    
    // Check if we've completed all words
    if (nextIndex >= listToLearn.length) {
      handleCompleteDay();
      return;
    }
    
    // Move to next word and reset states
    setWordIndex(nextIndex);
    setCompletedWords(completedWords + 1);
    setShowDefinition(false);
    setInputVal('');
  }

  return (
    <section id="challenge">
      <h1>{word}</h1>
      {isNewWord && (<p>{definition}</p>)}
      
      <div className="helper">
        <div>
          {[...Array(definition.length).keys()].map((char, elementIdx) => {
            const styleToApply = inputVal.length < char + 1
              ? ''
              : inputVal.split('')[elementIdx].toLowerCase() === definition.split('')[elementIdx].toLowerCase()
                ? 'correct'
                : 'incorrect';
            
            return (
              <div className={' ' + styleToApply} key={elementIdx}></div>
            );
          })}
        </div>
        
        <input 
          value={inputVal} 
          onChange={(e) => {
            if(e.target.value.length === definition.length && e.target.value.length > inputVal.length) {
              if(e.target.value.toLowerCase() === definition.toLowerCase()) {
                // Correct answer - move to next word
                moveToNextWord();
                return;
              }
            }
            setInputVal(e.target.value);
          }} 
          type="text" 
          placeholder="Enter the definition..."
        />
      </div>
      
      <div className="Challenge-btns">
        <button onClick={() => handleChangePage(1)} className="card-button-secondary">
          <h6>Quit</h6>
        </button>
        <button onClick={giveup} className="card-button-primary">
          <h6>I forgot</h6>
        </button>
      </div>
      
      <ProgressBar
        remainder={(completedWords * 100) / originalLength}
        text={`${completedWords} / ${originalLength}`}
      />
    </section>
  );
}
