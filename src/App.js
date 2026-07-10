import { useEffect,useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Error from "./Error";
import Loader from "./Loader";
import StartScreen from "./StartScreen";

const initialState = {
  questions: [],

  // status can be "loading", "error", "ready, "active", "finished"
  status: "loading",
}

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, 
        status: "ready" };

      case "dataFailed":
      return { ...state, status: "error" };
      default:
      throw new Error("Unknown action type");
  }
}

export default function App() {
  // Destructuring the status and questions from useReducer
  // const [{initialState.questions, initialState.status}, dispatch] = useReducer(reducer, initialState);
  const [{questions, status}, dispatch] = useReducer(reducer, initialState);
  
  const numQuestions = questions.length; 

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", 
        payload: data }))
        .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="App">
      <Header />
    
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen numQuestionsProp={numQuestions} />}
      </Main>
    </div>
  );
}