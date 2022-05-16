const checkTime = (durationS: number) => {
  return setTimeout(() => {
    const newTime = new Date();

    postMessage(newTime);

    checkTime(60);
  }, durationS * 1000);
};

let timeoutHandle: NodeJS.Timeout;

onmessage = (event) => {
  const { data } = event;

  if (data === 'start') {
    const currentTime = new Date();
    const elapsedSeconds = currentTime.getSeconds();

    const secondsUntilNextMinute = 60 - elapsedSeconds;

    timeoutHandle = checkTime(secondsUntilNextMinute);
  } else {
    clearTimeout(timeoutHandle);
  }
};

export {};