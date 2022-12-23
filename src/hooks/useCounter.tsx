import { useEffect, useState } from 'react';

type UseCounterOutput = {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

const useCounter = (initialValue?: number): UseCounterOutput => {
  const [count, setCount] = useState(initialValue || 0);

  const increment = () => setCount((x) => x + 1);
  const decrement = () => setCount((x) => x - 1);
  const reset = () => setCount(initialValue || 0);

  useEffect(() => {
    if (initialValue) {
      setCount(initialValue);
    }
  }, [initialValue]);

  return {
    count,
    increment,
    decrement,
    reset,
    setCount,
  };
};

export default useCounter;
