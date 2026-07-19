// index: To track the current question in the state
// Any Prop used in this project is to update the state of the parent component, App.js, and not to update the state of the child component, Question.js
// at() => is used to get an item from an array at a specific index/position. 
// questions: state.questions is used to keep the fetched API quiz questions intact even after resetting the game.

import { useEffect, useReducer } from "react";

import Header from "./Header";
import Main from "./Main";
import Error from "./Error";
import Loader from "./Loader";
import StartScreen from "./StartScreen";
import Question from "./Question";

import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const initialState = {
  questions: [],

  // status can be "loading", "error", "ready, "active", "finished"
  status: "loading",
  index: 0,
  answer: null,
  points: 0, 
  highscore: 0,
  secondsRemaining: 10,
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
// if the cur state points > cur state highscore then update the highscore to the cur state points else keep the cur state highscore as it is.
          case "finish":
            return {
              ...state,
              status: "finished",
              highscore: state.points > state.highscore 
              ? state.points : state.highscore,
            };

// Overwrite the questions [] in the initialState with the questions fetched from the API and reset the other state properties to their initial values. Also change status to "ready" to show the StartScreen component again.
            case "restart":
              return{
                ...initialState,
                questions: state.questions,
                status: "ready",
              }
              // OR return {
              //   ...state,
              //   status: "ready",
              //   index: 0,
              //   answer: null,
              //   points: 0,
              //   highscore: 0,
              // };

              case "tick":
    default:
      throw new Error("Unknown action type");
  }
}

export default function App() {
  // const [state, dispatch] = useReducer(reducer, initialState);
  // const = {questions, status, index, answer, points} = state; OR

  // Destructuring the status and questions from useReducer
  const [{ questions, status, index, answer, points, highscore }, dispatch]
   = useReducer(
    reducer,
    initialState,
  );

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points, 0
  );

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
            startDispatch={dispatch}
          />
        )}

        {status === "active" &&
        <>
        <Progress indexProp={index} numQuestions={numQuestions}
        answerProp={answer} pointsProp={points} 
        maxPossiblePointsProp={maxPossiblePoints} />

         <Question questionProp={questions[index]}
        answerDispatch={dispatch} answerProp={answer}
        />

        <Footer>
        <Timer />
        <NextButton nextBtnDispatch={dispatch} 
        answerProp={answer} indexProp={index} 
        numQuestions={numQuestions} />
      
          
         </Footer>
        </>

}
        {status === "finished" && <FinishScreen pointsProp={points} 
        maxPossiblePointsProp={maxPossiblePoints}
        highscoreProp={highscore} restartDispatch={dispatch}/>}
      </Main>
    </div>
  );
}
