//... state (previous state ) => ...state is copying the state as it was before the new update
// current step value (count) is controlled by the reducer function (inc, dec, setCount, setStep, reset)
// action is an object that describes how to update the state
// dispatch is a function that sends (triggers) an action to the reducer function for a state update
// action is an object that describes how the reducer should update the state
// payload is the data that is sent with the action to update the state

import { useReducer } from "react";
 const initialState = {count: 0, step: 1}

function reducer(state, action) {
  console.log(state, action)

  switch (action.type) {
    case "inc":
      return { ...state, count: state.count + state.step };
    case "dec":
      return { ...state, count: state.count - state.step };
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      return initialState;
    default:
      throw new Error("Unknown action type");
  }
}
function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec"});
  };

  const inc = function () {
    // dispatch({ type: "inc", payload: 1 });
      dispatch({ type: "inc"});
  };

  const defineCount = function (e) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
    // setCount(Number(e.target.value));
  };

  const defineStep = function (e) {
   dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "reset"  });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;