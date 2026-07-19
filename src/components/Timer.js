// Every setInterval() call returns a unique interval ID which can be used to clear the interval using clearInterval() method for timer cleanup.
// seconds => secondsRemaining  % 60 = 450/ 60 = 7 remainder 30, then 30 becomes the secondsRemaining for the timer countdown.
// minutes => Math.floor(secondsRemaining / 60) = 450/60 = 7.5 => 7 minutes
import { useEffect } from "react";

function Timer({ dispatchTimer, secondsRemainingProp }) {
  useEffect(function() {
  setInterval(function() {
    dispatchTimer({ type: "tick" });
    }, 1000);
  }, [dispatchTimer]);
  return <div className="timer">{secondsRemainingProp}</div>;
}

export default Timer
