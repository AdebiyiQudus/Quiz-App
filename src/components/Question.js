import Options from "./Options";

function Question({ questionProp, answerDispatch, answerProp }) {
  return (
    <div>
      <h4>{questionProp.question}</h4>
      <Options questionProp={questionProp} 
      answerDispatch={answerDispatch} answerProp={answerProp} />
    </div>
  );
}

export default Question;
