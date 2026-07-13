// index: To track the current question in the state
// Any Prop used in this project is to update the state of the parent component, App.js, and not to update the state of the child component, Question.js
// at() => is used to get an item from an array at a specific index/position. 

import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Error from "./Error";
import Loader from "./Loader";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";

const initialState = {
  questions: [],

  // status can be "loading", "error", "ready, "active", "finished"
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
      case "newAnswer":
        const question = state.questions.at(state.index);

        return { 
          ...state, 
    // index btn the user clicks
          answer: action.payload,
          points: action.payload === question.correctOption ?
           state.points + question.points : state.points,
        }

        case "nextQuestion":
          return {
            ...state,
            index: state.index + 1,
            answer: null,
          };
    default:
      throw new Error("Unknown action type");
  }
}

export default function App() {
  // const [state, dispatch] = useReducer(reducer, initialState);
  // const = {questions, status, index, answer} = state; OR

  // Destructuring the status and questions from useReducer
  const [{ questions, status, index, answer }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const numQuestions = questions.length;

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="App">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            numQuestionsProp={numQuestions}
            dispatchProp={dispatch}
          />
        )}

        {status === "active" &&
        <>
         <Question questionProp={questions[index]}
        answerDispatch={dispatch} answerProp={answer}
        />
        <NextButton nextBtnDispatch={dispatch} answerProp={answer} />
        </>
  }
      </Main>
    </div>
  );
}
