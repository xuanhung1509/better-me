import { useMemo, useRef, useState } from 'react';
import Countdown, { CountdownApi, zeroPad } from 'react-countdown';
import { Layout } from '@/components';

const Pomodoro = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [sessionLength, setSessionLength] = useState(25);
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
            <button
              type='button'
              className='rounded bg-red-200 py-2 px-4'
              onClick={handleResetClick}
            >
              Give up
            </button>
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
      </div>
    </Layout>
  );
};

export default Pomodoro;
