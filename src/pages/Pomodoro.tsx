import { useMemo, useRef, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { Dialog, Switch } from '@headlessui/react';
import { Cog8ToothIcon } from '@heroicons/react/24/outline';
import Countdown, { CountdownApi, zeroPad } from 'react-countdown';

import { usePomodoroContext } from '@/contexts/PomodoroContext';
import { Layout } from '@/components';

type ModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal = ({ isOpen, setIsOpen }: ModalProps) => {
  const { showGiveUpButton, setShowGiveUpButton } = usePomodoroContext();

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className='relative z-50'
    >
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
                onChange={setShowGiveUpButton}
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
              onClick={() => setIsOpen(false)}
              className='rounded bg-green-300 px-4 py-2'
            >
              Apply
            </button>
            <button
              type='button'
              onClick={() => setIsOpen(false)}
              className='rounded bg-slate-300 px-4 py-2'
            >
              Close
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

const Pomodoro = () => {
  const { showGiveUpButton } = usePomodoroContext();

  const [modalOpen, setModalOpen] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [sessionLength, setSessionLength] = useLocalStorage(
    'sessionLength',
    25,
  );
  const sessionLengthInMilliseconds = sessionLength * 60 * 1000;

  const date = useMemo(
    () => Date.now() + sessionLengthInMilliseconds,
    [sessionLengthInMilliseconds],
  );

  let countdownApi: CountdownApi | null = null;

  const setRef = (countdown: Countdown | null): void => {
    if (countdown) {
      countdownApi = countdown.getApi();
    }
  };

  const renderCountdown = ({
    completed,
    minutes,
    seconds,
    api,
  }: {
    completed: boolean;
    minutes: number;
    seconds: number;
    api: CountdownApi;
  }) => {
    if (isStarted && api && api.isStopped()) {
      console.log('Stopped.');
    }

    const timeElapsedInMilliseconds =
      sessionLengthInMilliseconds - (minutes * 60 + seconds) * 1000;
    const progress =
      (timeElapsedInMilliseconds / sessionLengthInMilliseconds) * 100;

    const radius = 50;
    const strokeWidth = 3;
    const normalizedRadius = radius - strokeWidth;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    if (completed) {
      return <div>Completed</div>;
    }

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const minutes = Number(e.target.value);

    if (minutes <= 0) {
      alert('Invalid input. Must be between 1 and 180.');
      return;
    }

    setSessionLength(Number(e.target.value));
    setIsStarted(false);
    setIsCompleted(false);
  };

  const handleStartClick = (): void => {
    if (!countdownApi) return;

    countdownApi.start();
    setIsStarted(true);
  };

  const handlePauseClick = (): void => {
    if (!countdownApi) return;

    if (countdownApi.isPaused()) {
      countdownApi.start();
      setIsPaused(false);
    } else {
      countdownApi.pause();
      setIsPaused(true);
    }
  };

  const isPausedBeforeGiveUpClick = useRef(false);

  const handleResetClick = (): void => {
    if (!countdownApi) return;

    isPausedBeforeGiveUpClick.current = countdownApi.isPaused();

    if (!isPausedBeforeGiveUpClick.current) {
      countdownApi.pause();
      setIsPaused(true);
    }

    if (window.confirm('Are you sure?')) {
      countdownApi.stop();
      setIsStarted(false);
      setIsPaused(false);
      alert('Good luck next time!');
    }

    // FIXME: Don't know why this doesn't work
    if (!isPausedBeforeGiveUpClick.current) {
      countdownApi.start();
    }
  };

  const handleCompleted = () => {
    setIsStarted(false);
    setIsPaused(false);
    setIsCompleted(true);
    alert('Amazing Good Job!!!');
  };

  const handleClaimRewardClick = (): void => {
    setIsCompleted(false);
    alert('Rewards claimed!');
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
          value={sessionLength}
          onChange={handleInputChange}
        />
        <Countdown
          ref={setRef}
          date={date}
          autoStart={false}
          renderer={renderCountdown}
          onComplete={handleCompleted}
        />

        {!isStarted && !isCompleted && (
          <button
            type='button'
            className='rounded bg-red-200 py-2 px-4'
            onClick={handleStartClick}
          >
            Start
          </button>
        )}

        {isStarted && (
          <div className='flex items-center justify-center gap-4'>
            <button
              type='button'
              className='rounded bg-green-200 py-2 px-4'
              onClick={handlePauseClick}
            >
              {isPaused ? 'Resume' : 'Pause'}
            </button>

            {showGiveUpButton && (
              <button
                type='button'
                className='rounded bg-red-200 py-2 px-4'
                onClick={handleResetClick}
              >
                Give up
              </button>
            )}
          </div>
        )}

        {isCompleted && (
          <button
            type='button'
            className='rounded bg-red-200 py-2 px-4'
            onClick={handleClaimRewardClick}
          >
            Claim rewards
          </button>
        )}

        {!isStarted && (
          <button type='button' onClick={() => setModalOpen(true)}>
            <Cog8ToothIcon className='h-8 w-6' />
          </button>
        )}
      </div>

      <Modal isOpen={modalOpen} setIsOpen={setModalOpen} />
    </Layout>
  );
};

export default Pomodoro;
