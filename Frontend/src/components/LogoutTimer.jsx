import { React, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutThunk } from "../features/Authentication/authSlice";
import { useTimer } from "../contexts/";

function LogoutTimer() {
  const dispatch = useDispatch();
  const [labelTimer, setLabelTimer] = useState("");
  const { timer, decrementTimer } = useTimer();
  let timeInterval = null;

  const displayTimer = function () {
    const min = String(Math.floor(timer / 60)).padStart(2, "0");
    const sec = String(Math.floor(timer % 60)).padStart(2, "0");

    setLabelTimer(`${min}:${sec}`);
    if (timer === 0) {
      clearInterval(timeInterval);
      dispatch(logoutThunk());
    }
    decrementTimer();
  };

  useEffect(() => {
    displayTimer();
  }, []);

  useEffect(() => {
    timeInterval = setInterval(displayTimer, 1000);
    return () => {
      clearInterval(timeInterval);
    };
  }, [labelTimer, timer]);

  return (
    <p className="logout-timer">
      You will be logged out in <span className="timer">{labelTimer}</span>
    </p>
  );
}

export default LogoutTimer;
