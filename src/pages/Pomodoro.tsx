import { useEffect, useRef, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { Dialog } from '@headlessui/react';
import {
  MinusIcon,
  PencilIcon,
  PlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

import { useCountdown } from '@/hooks';
import { usePomodoroContext } from '@/contexts/PomodoroContext';
import { Layout } from '@/components';
import iceCream from '@/assets/images/illustrations/ice-cream.svg';
import zombieing from '@/assets/images/illustrations/zombieing.svg';

type ConfirmBoxProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ConfirmBox = ({ isOpen, onClose, onConfirm }: ConfirmBoxProps) => (
  <Dialog open={isOpen} onClose={onClose} className='relative z-50'>
    <div className='fixed inset-0 bg-slate-500/80' />
    <div className='fixed inset-0 flex items-center justify-center p-4'>
      <Dialog.Panel className='w-full max-w-sm rounded-3xl bg-white p-8 shadow'>
        <Dialog.Title className='text-2xl font-bold'>
          Are you sure?
        </Dialog.Title>
        <Dialog.Description className='mt-1 text-gray-500'>
          A withered tree will appear in your forest.
        </Dialog.Description>

        <div className='mt-6 flex items-center justify-end gap-2'>
          <button
            type='button'
            onClick={onClose}
            className='rounded-2xl border border-red-500 px-8 py-3 text-red-500'
          >
            Cancel
          </button>
          <button
            type='button'
            onClick={onConfirm}
            className='rounded-2xl bg-red-500 px-8 py-3 text-white'
          >
            Give up
          </button>
        </div>
      </Dialog.Panel>
    </div>
  </Dialog>
);

type AlertProps = {
  isOpen: boolean;
  onClose: () => void;
  isSuccessful: boolean;
};

const Alert = ({ isOpen, onClose, isSuccessful }: AlertProps) => (
  <Dialog open={isOpen} onClose={onClose} className='relative z-50'>
    <div className='fixed inset-0 bg-slate-500/80' />
    <div className='fixed inset-0 flex items-center justify-center p-4'>
      <Dialog.Panel className='relative w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl'>
        <Dialog.Title className='text-2xl font-bold'>
          {isSuccessful ? 'Congratulations!' : 'Oops!'}
        </Dialog.Title>
        <Dialog.Description className='mt-1'>
          <p className='text-gray-500'>
            {isSuccessful ? 'Keep up the good work.' : 'Better luck next time.'}
          </p>
          <div className='mt-6'>
            <img src={isSuccessful ? iceCream : zombieing} alt='' />
          </div>
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
  isRunning: boolean;
  isCompleted: boolean;
  timeLeft: number;
  confirmBoxOpen: boolean;
  handleResetClick: () => void;
};

const Countdown = ({
  sessionLength,
  isStarted,
  isRunning,
  isCompleted,
  timeLeft,
  confirmBoxOpen,
  handleResetClick,
}: CountdownProps) => {
  const { showGiveUpButton } = usePomodoroContext();
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
    <div className='relative w-64'>
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
          stroke='rgb(236 252 203)'
          strokeWidth={strokeWidth}
        />
        <circle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          fill='transparent'
          stroke='rgb(132 204 22)'
          strokeLinecap='round'
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className='transition-[stroke-dashoffset]'
        />
      </svg>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <span
          className={`text-5xl font-semibold tracking-wider text-gray-900 ${
            isStarted && !isRunning && !confirmBoxOpen && 'animate-ping'
          }`}
        >
          {zeroPad(minutes)}:{zeroPad(seconds)}
        </span>

        {isStarted && !isCompleted && showGiveUpButton && (
          <button
            type='button'
            onClick={handleResetClick}
            className='absolute top-20 left-1/2 -translate-x-1/2 text-sm'
          >
            Give up
          </button>
        )}
      </div>
    </div>
  );
};

const Pomodoro = () => {
  const [confirmBoxOpen, setConfirmBoxOpen] = useState(false);
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

  const handleResetClick = () => {
    isRunningBeforeResetClick.current = isRunning;
    setConfirmBoxOpen(true);

    if (isRunningBeforeResetClick.current) {
      stopCountdown();
      setIsRunning(false);
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
        <div className='flex w-60 items-center justify-center gap-4 rounded-2xl bg-lime-200 px-8 py-2'>
          Enter your task
          <PencilIcon className='h-4 w-4' />
        </div>

        <Countdown
          {...{
            sessionLength,
            isStarted,
            isRunning,
            isCompleted,
            timeLeft,
            confirmBoxOpen,
            handleResetClick,
          }}
        />

        {!isStarted && !isCompleted && (
          <div className='flex items-center gap-4'>
            <button
              type='button'
              disabled={sessionLength / 60 <= 15}
              onClick={() => {
                setSessionLength((prev) => {
                  if (prev / 60 > 15) {
                    return prev - 5 * 60;
                  }

                  return prev;
                });
              }}
              className='rounded-full bg-lime-500 p-3 text-white disabled:bg-gray-300'
            >
              <MinusIcon className='h-6 w-6' />
            </button>
            <button
              type='button'
              disabled={sessionLength / 60 >= 120}
              onClick={() => {
                setSessionLength((prev) => {
                  if (prev / 60 < 120) {
                    return prev + 5 * 60;
                  }

                  return prev;
                });
              }}
              className='rounded-full bg-lime-500 p-3 text-white disabled:bg-gray-300'
            >
              <PlusIcon className='h-6 w-6' />
            </button>
          </div>
        )}

        {!isStarted && !isCompleted && (
          <button
            type='button'
            onClick={handleStart}
            className='rounded-2xl bg-red-500 py-3 px-8 text-lg font-bold text-white'
          >
            Start
          </button>
        )}

        {isStarted && !isCompleted && (
          <div className='flex items-center justify-center gap-4'>
            <button
              type='button'
              onClick={handlePause}
              className='rounded-2xl bg-lime-500 py-4 px-8 text-white'
            >
              {isRunning ? 'Pause' : 'Resume'}
            </button>
          </div>
        )}
      </div>

      {confirmBoxOpen && (
        <ConfirmBox
          isOpen={confirmBoxOpen}
          onClose={() => {
            setConfirmBoxOpen(false);
            if (isRunningBeforeResetClick.current) {
              startCountdown();
              setIsRunning(true);
            }
          }}
          onConfirm={() => {
            setConfirmBoxOpen(false);
            setAlertOpen(true);
            setIsStarted(false);
          }}
        />
      )}

      {alertOpen && (
        <Alert
          isOpen={alertOpen}
          onClose={handleCloseAlert}
          isSuccessful={isCompleted}
        />
      )}
    </Layout>
  );
};

export default Pomodoro;
