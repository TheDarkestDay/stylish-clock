import classNames from 'classnames';

import styles from './CurrentTime.module.css';

type Props = {
  value: Date;
};

const timeFormat = new Intl.DateTimeFormat([], {
  hour: 'numeric',
  minute: '2-digit',
  timeZoneName: 'short',
  hourCycle: 'h24',
});

export const CurrentTime = ({value}: Props) => {
  const formattedTime = timeFormat.format(value);
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