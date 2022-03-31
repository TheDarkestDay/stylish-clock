import classNames from 'classnames';

import styles from './CurrentTime.module.css';

export const CurrentTime = () => {
  return (
    <section className={styles.currentTime}>
      <p className={classNames(styles.greeting, 'fluidFontSize')}>
        Good morning, it's currently
      </p>

      <div>
        <time className={classNames(styles.timeValue, 'fluidFontSize')} dateTime="11:37">11<span className={styles.timeDelimiter}>:</span>37</time>
        <span className={classNames(styles.timeZone, 'fluidFontSize')}>BST</span>
        <p className={classNames(styles.location, 'fluidFontSize')}>in London, UK</p>
      </div>
    </section>
  );
};