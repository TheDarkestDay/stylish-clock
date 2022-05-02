import { useState, useEffect } from 'react';

const clockWorker = new Worker(
  new URL('./clock.worker.ts', import.meta.url),
);

type State = {
  currentTime: Date;
};

export const useClock = () => {
  const [state, setState] = useState<State>({
    currentTime: new Date(),
  });

  const { currentTime } = state;
  const elapsedSeconds = currentTime.getSeconds();

  useEffect(() => {
    clockWorker.postMessage('start');

    clockWorker.onmessage = ({data: currentTime}) => {
      setState({currentTime});
    };

    return () => clockWorker.postMessage('stop');
  }, [elapsedSeconds, setState]);

  return currentTime;
};