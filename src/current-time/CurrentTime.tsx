import { ForwardedRef, forwardRef } from 'react';
import classNames from 'classnames';

import { ReactComponent as MoonIcon } from '../assets/desktop/icon-moon.svg';
import { ReactComponent as SunIcon } from '../assets/desktop/icon-sun.svg';
import styles from './CurrentTime.module.css';

type Props = {
  value: Date;
  timeScale: number;
  country?: string;
  city?: string;
  timeOfTheDay: 'day' | 'night';
};

const timeFormat = new Intl.DateTimeFormat([], {
  hour: 'numeric',
  minute: '2-digit',
  timeZoneName: 'short',
  hourCycle: 'h24',
});

const _CurrentTime = ({value, timeOfTheDay, country, city, timeScale}: Props, ref: ForwardedRef<HTMLDivElement | null>) => {
  const formattedTime = timeFormat.format(value);
  const [time, timeZone] = formattedTime.split(' ');
  const [hours, minutes] = time.split(':');

  const greetingIcon = timeOfTheDay === 'day' ? <SunIcon /> : <MoonIcon />;
  const greetingText = timeOfTheDay === 'day' ? 'Good morning' : 'Good evening';

  const locationContent = country && city ? `in ${city}, ${country}` : 'in your location';

  return (
    <section ref={ref} style={{transform: `scale(${timeScale})`}} className={styles.currentTime}>
      <p className={classNames(styles.greeting, 'fluidFontSize')}>
        <span aria-hidden="true" className={styles.greetingIcon}>{greetingIcon}</span>{greetingText}, it's currently
      </p>

      <div>
        <time className={classNames(styles.timeValue, 'fluidFontSize')} dateTime={formattedTime}>{hours}<span className={styles.timeDelimiter}>:</span>{minutes}</time>
        <span className={classNames(styles.timeZone, 'fluidFontSize')}>{timeZone}</span>
        <p className={classNames(styles.location, 'fluidFontSize')}>
          {locationContent}
        </p>
      </div>
    </section>
  );
};

export const CurrentTime = forwardRef(_CurrentTime);