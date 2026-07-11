import Options from "./Options";

function Question({ questionProp }) {
  console.log(questionProp);

  return (
    <div>
      <h4>{questionProp.question}</h4>
      <Options questionProp={questionProp} />
    </div>
  );
}

export default Question;
