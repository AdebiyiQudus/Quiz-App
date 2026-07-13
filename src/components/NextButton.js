function Nextbutton({ nextBtnDispatch, answerProp, 
  indexProp, numQuestions }) {

  if(answerProp === null) return null;

  if (indexProp < numQuestions - 1)
  return (
    <div>
      <button className="btn btn-ui"
        onClick={() => nextBtnDispatch({ type: "nextQuestion" })}
        
      >
        Next
      </button>
    </div>
  )

   if (indexProp === numQuestions - 1)
  return (
    <div>
      <button className="btn btn-ui"
        onClick={() => nextBtnDispatch({ type: "finish" })}
        
      >
        Finish
      </button>
    </div>
  )
}

export default Nextbutton
