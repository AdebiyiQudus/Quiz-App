function Nextbutton({ nextBtnDispatch, answerProp }) {
  if(answerProp === null) return null;
  return (
    <div>
      <button className="btn btn-ui"
        onClick={() => nextBtnDispatch({ type: "nextQuestion" })}
        
      >
        Next
      </button>
    </div>
  )
}

export default Nextbutton
