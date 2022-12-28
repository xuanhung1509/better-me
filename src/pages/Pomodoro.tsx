import { useEffect, useRef, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { Dialog, Switch } from '@headlessui/react';
import { Cog8ToothIcon, XMarkIcon } from '@heroicons/react/24/outline';

import { useCountdown } from '@/hooks';
import { usePomodoroContext } from '@/contexts/PomodoroContext';
import { Layout } from '@/components';

type SettingsProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Settings = ({ isOpen, onClose }: SettingsProps) => {
  const { showGiveUpButton, setShowGiveUpButton } = usePomodoroContext();
  const prevStates = useRef({
    showGiveUpButton,
  });

  const handleSwitch = () => {
    prevStates.current.showGiveUpButton = showGiveUpButton;
    setShowGiveUpButton((prev) => !prev);
  };

  const handleApply = () => {
    prevStates.current.showGiveUpButton = showGiveUpButton;
    onClose();
  };

  const handleCancel = () => {
    if (showGiveUpButton !== prevStates.current.showGiveUpButton) {
      if (window.confirm('Do you want to save changes?')) {
        prevStates.current.showGiveUpButton = showGiveUpButton;
      } else {
        setShowGiveUpButton(prevStates.current.showGiveUpButton);
      }
    }

    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className='relative z-50'>
      <div className='fixed inset-0 bg-slate-500/80' />
      <div className='fixed inset-0 flex items-center justify-center p-4'>
        <Dialog.Panel className='w-full max-w-sm rounded-lg bg-white p-8 shadow'>
          <Dialog.Title className='text-2xl font-bold'>
            Pomodoro Settings
          </Dialog.Title>
          <Dialog.Description className='mt-1 text-gray-500'>
            Tweak these options however you like.
          </Dialog.Description>

          <ul className='mt-6 flex flex-col gap-2'>
            <Switch.Group
              as='li'
              className='flex items-center justify-between gap-4'
            >
              <Switch.Label>Enable give up button</Switch.Label>
              <Switch
                checked={showGiveUpButton}
                onChange={handleSwitch}
                className={`${
                  showGiveUpButton ? 'bg-green-500' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span
                  className={`${
                    showGiveUpButton ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </Switch.Group>
          </ul>

          <div className='mt-6 flex items-center justify-end gap-2'>
            <button
              type='button'
              onClick={handleApply}
              className='rounded bg-green-300 px-4 py-2'
            >
              Apply
            </button>
            <button
              type='button'
              onClick={handleCancel}
              className='rounded bg-slate-300 px-4 py-2'
            >
              Cancel
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

type AlertProps = {
  isOpen: boolean;
  onClose: () => void;
  isSuccessful: boolean;
};

const Alert = ({ isOpen, onClose, isSuccessful }: AlertProps) => (
  <Dialog open={isOpen} onClose={onClose} className='relative z-50'>
    <div className='fixed inset-0 bg-slate-500/80' />
    <div className='fixed inset-0 flex items-center justify-center p-4'>
      <Dialog.Panel className='relative w-full max-w-sm rounded-lg bg-white p-8 text-center shadow-2xl'>
        <Dialog.Title className='text-2xl font-bold'>
          {isSuccessful ? 'Congratulations!' : 'Oops!'}
        </Dialog.Title>
        <Dialog.Description className='mt-1 text-gray-500'>
          {isSuccessful ? 'Keep up the good work.' : 'Better luck next time.'}
        </Dialog.Description>

        <button
          type='button'
          onClick={onClose}
          className='absolute top-2 right-2 rounded-full p-2 transition-colors hover:bg-slate-200'
        >
          <XMarkIcon className='h-4 w-4' />
        </button>
      </Dialog.Panel>
    </div>
  </Dialog>
);

type CountdownProps = {
  sessionLength: number;
  isStarted: boolean;
  timeLeft: number;
};

const Countdown = ({ sessionLength, isStarted, timeLeft }: CountdownProps) => {
  const timeElapsed = sessionLength - timeLeft;
  const progress = isStarted ? (timeElapsed / sessionLength) * 100 : 0;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = Math.floor(timeLeft % 60);

  const radius = 50;
  const strokeWidth = 3;
  const normalizedRadius = radius - strokeWidth;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const zeroPad = (number: number, length: number = 2): string =>
    String(number).padStart(length, '0');

  return (
    <div className='relative'>
      <svg
        width='100%'
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        className='-rotate-90'
      >
        <circle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          fill='#fff'
          stroke='#eee'
          strokeWidth={strokeWidth}
        />
        <circle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          fill='transparent'
          stroke='green'
          strokeLinecap='round'
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className='transition-[stroke-dashoffset]'
        />
      </svg>
      <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl font-bold tracking-wider'>
        {zeroPad(minutes)}:{zeroPad(seconds)}
      </span>
    </div>
  );
};

const Pomodoro = () => {
  const { showGiveUpButton } = usePomodoroContext();

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [success, setSuccess] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionLength, setSessionLength] = useLocalStorage(
    'sessionLength',
    25 * 60,
  );

  const [timeLeft, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: sessionLength,
    });

  const isCompleted = timeLeft === 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const minutes = Number(e.target.value);

    if (minutes < 1 || minutes > 180) {
      alert('Invalid input. Must be between 1 and 180.');
      return;
    }

    setSessionLength(minutes * 60);
    setIsStarted(false);
  };

  const handleStart = () => {
    startCountdown();
    setIsStarted(true);
    setIsRunning(true);
  };

  const handlePause = () => {
    if (isRunning) {
      stopCountdown();
      setIsRunning(false);
    } else {
      startCountdown();
      setIsRunning(true);
    }
  };

  const isRunningBeforeResetClick = useRef(false);

  const handleReset = () => {
    isRunningBeforeResetClick.current = isRunning;

    if (isRunningBeforeResetClick.current) {
      stopCountdown();
      setIsRunning(false);
    }

    if (window.confirm('Are you sure?')) {
      setAlertOpen(true);
      setIsStarted(false);
    } else if (isRunningBeforeResetClick.current) {
      startCountdown();
      setIsRunning(true);
    }
  };

  useEffect(() => {
    if (isCompleted) {
      setIsRunning(false);

      setTimeout(() => {
        setIsStarted(false);
        setAlertOpen(true);
      }, 300);
    }
  }, [isCompleted]);

  const handleCloseAlert = () => {
    if (isCompleted) {
      setSuccess((prev) => prev + 1);
    }

    setAlertOpen(false);
    resetCountdown();
  };

  return (
    <Layout>
      <div className='flex flex-col items-center justify-center gap-4'>
        <input
          type='number'
          min={1}
          max={180}
          className='w-32 bg-green-200 px-4 py-2'
          disabled={isStarted}
          value={sessionLength / 60}
          onChange={handleInputChange}
        />

        <Countdown {...{ sessionLength, isStarted, timeLeft }} />

        {!isStarted && !isCompleted && (
          <button
            type='button'
            onClick={handleStart}
            className='rounded bg-red-200 py-2 px-4'
          >
            Start
          </button>
        )}

        {isStarted && !isCompleted && (
          <div className='flex items-center justify-center gap-4'>
            <button
              type='button'
              onClick={handlePause}
              className='rounded bg-green-200 py-2 px-4'
            >
              {isRunning ? 'Pause' : 'Resume'}
            </button>
            {showGiveUpButton && (
              <button
                type='button'
                onClick={handleReset}
                className='rounded bg-red-200 py-2 px-4'
              >
                Reset
              </button>
            )}
          </div>
        )}

        {!isStarted && (
          <button type='button' onClick={() => setSettingsOpen(true)}>
            <Cog8ToothIcon className='h-8 w-6' />
          </button>
        )}

        <div>Success: {success}</div>
      </div>

      {alertOpen && (
        <Alert
          isOpen={alertOpen}
          onClose={handleCloseAlert}
          isSuccessful={isCompleted}
        />
      )}

      <Settings isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </Layout>
  );
};

export default Pomodoro;
