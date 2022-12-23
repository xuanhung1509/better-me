import { useCallback } from 'react';
import { useBoolean, useInterval } from 'usehooks-ts';
import useCounter from '@/hooks/useCounter';

type CountdownOption = {
  countStart: number;
  intervalMs?: number;
  isIncrement?: boolean;
  countStop?: number;
};

type CountdownControllers = {
  startCountdown: () => void;
  stopCountdown: () => void;
  resetCountdown: () => void;
};

const useCountdown = (
  countdownOption: CountdownOption,
): [number, CountdownControllers] => {
  const {
    countStart,
    intervalMs = 1000,
    isIncrement = false,
    countStop = 0,
  } = countdownOption;

  const {
    count,
    increment,
    decrement,
    reset: resetCounter,
  } = useCounter(countStart);

  const {
    value: isCountdownRunning,
    setTrue: startCountdown,
    setFalse: stopCountdown,
  } = useBoolean(false);

  const resetCountdown = () => {
    stopCountdown();
    resetCounter();
  };

  const countdownCallback = useCallback(() => {
    if (count === countStop) {
      stopCountdown();
      return;
    }

    if (isIncrement) {
      increment();
    } else {
      decrement();
    }
  }, [count, countStop, decrement, increment, isIncrement, stopCountdown]);

  useInterval(countdownCallback, isCountdownRunning ? intervalMs : null);

  return [
    count,
    {
      startCountdown,
      stopCountdown,
      resetCountdown,
    } as CountdownControllers,
  ];
};

export default useCountdown;
