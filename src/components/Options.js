// hasAnswer ? (index === questionProp.correctOption => If the user has answered, then check if the index of the button clicked === correctOption, then add the class "correct" to the button
function Options({questionProp, answerDispatch, answerProp}) {
  const hasAnswer = answerProp !== null; // True

  return (
    <div className="options">
      {questionProp.options.map((option, index) => (
        // If the index btn clicked === user answer, then add the class "answer" to the button
        <button className={`btn btn-option 
          ${index === answerProp ? "answer" : ""} 
          ${hasAnswer ? (index === questionProp.correctOption ? 
            "correct" : "wrong") : ""}`}
            
            key={option} 
            disabled={hasAnswer}
            onClick={() => answerDispatch({type: "newAnswer",
               payload: index})}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

export default Options
