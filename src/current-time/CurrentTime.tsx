import classNames from 'classnames';

import styles from './CurrentTime.module.css';

export const CurrentTime = () => {
  return (
    <section className={styles.currentTime}>
      <p className={classNames(styles.greeting, styles.clockTypography, 'fluidFontSize')}>
        Good morning, it's currently
      </p>

      <div>
        <time className={classNames(styles.timeValue, styles.clockTypography, 'fluidFontSize')} dateTime="11:37">11:37</time>
        <span className={classNames(styles.timeZone, styles.clockTypography, 'fluidFontSize')}>BST</span>
        <p className={classNames(styles.location, styles.clockTypography, 'fluidFontSize')}>in London, UK</p>
      </div>
    </section>
  );
};