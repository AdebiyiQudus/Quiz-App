// convert Boolean to Number => Number (false) = 0, Number (true) = 1
// answerProp => when user clicks on any of the option btn, answerProp will be set to the index of the option btn clicked

function Progress({ indexProp, numQuestions, answerProp,
   pointsProp, maxPossiblePointsProp }) {
  return (
    <header className="progress">
      <progress max={numQuestions} 
      value={indexProp + Number(answerProp !== null)} />
      <p>
        Question <strong>{indexProp + 1}
          </strong> / <strong>{numQuestions}</strong>
      </p>

      <p>
        <strong>{pointsProp}</strong> / 
        <strong>{maxPossiblePointsProp}</strong>
      </p>
    </header>
  )
}

export default Progress;
