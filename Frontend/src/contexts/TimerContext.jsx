import { createContext, useContext, useCallback, useState } from "react";

export const TimerContext = createContext({
  timer: 0,
  decrementTimer: () => {},
  initializeTimer: () => {},
});

export const TimerProvider = function ({ children }) {
  const [timer, setTimer] = useState(60 * 1);

  const decrementTimer = useCallback(function () {
    setTimer((prevTimer) => Math.max(prevTimer - 1, 0));
  }, []);

  const initializeTimer = useCallback(function () {
    setTimer(60 * 1);
  }, []);

  return <TimerContext.Provider value={{ timer, decrementTimer, initializeTimer }}>{children}</TimerContext.Provider>;
};

export default function useTimer() {
  return useContext(TimerContext);
}
