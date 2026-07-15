function FinishScreen({ pointsProp, maxPossiblePointsProp,
  highscoreProp, restartDispatch }) {

  const percentage = (pointsProp / maxPossiblePointsProp) * 100;

  let emoji;
  if (percentage === 100) emoji = "🏆";
  if (percentage >= 80 && percentage < 100) emoji = "🥳";
  if (percentage >= 50 && percentage < 80) emoji = "🙂";
  if (percentage >= 0 && percentage < 50) emoji = "😐";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <>
    <p className="result">
      <span>{emoji}</span> You scored <strong>
        {pointsProp}</strong> out of {maxPossiblePointsProp} (
          {Math.ceil(percentage)}%)
    </p>
    <p className="highscore"> (Highscore: {highscoreProp})
      points </p>

      <button className="btn btn-ui"
        onClick={() => restartDispatch({ type: "restart" })}       
      >
        Restart Quiz
      </button>
    </>
  )
}

export default FinishScreen
