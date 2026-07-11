function Options({questionProp}) {
  return (
    <div className="options">
      {questionProp.options.map((option) => (
        <button key={option} className="btn btn-option">
          {option}
        </button>
      ))}
    </div>
  )
}

export default Options
