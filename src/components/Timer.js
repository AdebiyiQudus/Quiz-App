// minutes => Math.floor(secondsRemaining / 60) = 450/60 = 7.5 => 7 minutes
// seconds => secondsRemaining  % 60 = 450/ 60 = 7 remainder 30, then 30 becomes the secondsRemaining for the timer countdown.

import { useEffect } from "react";

function Timer({ dispatchTimer, secondsRemainingProp }) {
  const mins = Math.floor(secondsRemainingProp / 60);
  const seconds = secondsRemainingProp % 60;

  useEffect(function() {
    // Every single setInterval() call returns a unique interval ID which can be used to clear the interval using clearInterval() method for timer cleanup.
    const id = setInterval(function () {
      dispatchTimer({ type: "tick" });
    }, 1000);

    // Return a cleanup function to clear it when the component unmounts
    return function () {
      clearInterval(id);
    };
  }, [dispatchTimer]);

  return (
  <div className="timer">
    {mins < 10 && "0"}
    {mins}:{seconds < 10 && "0"}{seconds}
  </div>
  );
}

export default Timer
