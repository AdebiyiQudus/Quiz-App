import Options from "./Options";

function Question({ questionProp, questDispatch, answerProp }) {
  console.log(questionProp);

  return (
    <div>
      <h4>{questionProp.question}</h4>
      <Options questionProp={questionProp} 
      questDispatch={questDispatch} answerProp={answerProp} />
    </div>
  );
}

export default Question;
