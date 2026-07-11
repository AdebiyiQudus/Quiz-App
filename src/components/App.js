// index: To track the current question in the state

import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Error from "./Error";
import Loader from "./Loader";
import StartScreen from "./StartScreen";
import Question from "./Question";

const initialState = {
  questions: [],

  // status can be "loading", "error", "ready, "active", "finished"
  status: "loading",
  index: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    default:
      throw new Error("Unknown action type");
  }
}

export default function App() {
  // const [state, dispatch] = useReducer(reducer, initialState);
  // const = {questions, status, index} = state; OR

  // Destructuring the status and questions from useReducer
  const [{ questions, status, index }, dispatch] = useReducer(
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

        {status === "active" && <Question questionProp={questions[index]} />}
      </Main>
    </div>
  );
}
