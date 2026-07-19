// Every setInterval() call returns a unique interval ID which can be used to clear the interval using clearInterval() method for timer cleanup.
// seconds => secondsRemaining  % 60 = 450/ 60 = 7 remainder 30, then 30 becomes the secondsRemaining for the timer countdown.
// minutes => Math.floor(secondsRemaining / 60) = 450/60 = 7.5 => 7 minutes
import { useEffect } from "react";

function Timer() {
  useEffect(function() {
  setInterval(function() {
      // console.log("tick");
    }, 1000);
  }, []);
  return <div className="timer">05:00</div>;
}

export default Timer
