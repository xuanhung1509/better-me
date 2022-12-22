import { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from 'usehooks-ts';

type PomodoroContextProps = {
  showGiveUpButton: boolean;
  setShowGiveUpButton: React.Dispatch<React.SetStateAction<boolean>>;
};

const PomodoroContext = createContext<PomodoroContextProps | null>(null);

type PomodoroProviderProps = {
  children: React.ReactNode;
};

const PomodoroProvider = ({ children }: PomodoroProviderProps) => {
  const [showGiveUpButton, setShowGiveUpButton] = useLocalStorage(
    'showGiveUpButton',
    true,
  );

  const contextValue = useMemo(
    () => ({
      showGiveUpButton,
      setShowGiveUpButton,
    }),
    [showGiveUpButton, setShowGiveUpButton],
  );

  return (
    <PomodoroContext.Provider value={contextValue}>
      {children}
    </PomodoroContext.Provider>
  );
};

const usePomodoroContext = () => {
  const context = useContext(PomodoroContext);

  if (!context) {
    throw new Error('usePomodoroContext must be used inside Pomodoro Provider');
  }

  return context;
};

export { PomodoroProvider, usePomodoroContext };
