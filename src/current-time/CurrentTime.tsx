import { useState, useEffect } from 'react';
import classNames from 'classnames';

import styles from './CurrentTime.module.css';

type Props = {
  onTick: (time: Date) => void;
};

type State = {
  currentTime: Date;
};

const timeFormat = new Intl.DateTimeFormat([], {
  hour: 'numeric',
  minute: '2-digit',
  timeZoneName: 'short',
  hourCycle: 'h24',
});

export const CurrentTime = ({onTick}: Props) => {
  const [state, setState] = useState<State>({
    currentTime: new Date(),
  });

  const { currentTime } = state;
  const elapsedSeconds = currentTime.getSeconds();

  useEffect(() => {
    onTick(currentTime);
  }, [currentTime, onTick]);

  useEffect(() => {
    const checkTimeAfter = 60 - elapsedSeconds;

    const timeout = setTimeout(() => {
      setState((oldState) => ({
        ...oldState,
        currentTime: new Date(),
      }));
    }, checkTimeAfter * 1000);

    return () => clearTimeout(timeout);
  }, [elapsedSeconds, setState]);

  const formattedTime = timeFormat.format(currentTime);
  const [time, timeZone] = formattedTime.split(' ');
  const [hours, minutes] = time.split(':');

  return (
    <section className={styles.currentTime}>
      <p className={classNames(styles.greeting, 'fluidFontSize')}>
        Good morning, it's currently
      </p>

      <div>
        <time className={classNames(styles.timeValue, 'fluidFontSize')} dateTime={formattedTime}>{hours}<span className={styles.timeDelimiter}>:</span>{minutes}</time>
        <span className={classNames(styles.timeZone, 'fluidFontSize')}>{timeZone}</span>
        <p className={classNames(styles.location, 'fluidFontSize')}>in London, UK</p>
      </div>
    </section>
  );
};