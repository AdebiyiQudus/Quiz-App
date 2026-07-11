function Options({questionProp, questDispatch, answerProp}) {
  const hasAnswer = answerProp !== null;

  return (
    <div className="options">
      {questionProp.options.map((option, index) => (
        <button className={`btn btn-option 
          ${index === answerProp ? "answer" : ""} 
          ${hasAnswer ? (index === questionProp.correctOption ? 
            "correct" : "wrong") : ""}`}
            
            key={option} 
            disabled={hasAnswer}
            onClick={() => questDispatch({type: "newAnswer",
               payload: index})}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

export default Options
