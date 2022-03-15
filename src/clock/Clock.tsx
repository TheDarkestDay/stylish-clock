import {FlexRow} from '../flex-row/FlexRow';
import styles from './Clock.module.css';

export const Clock = () => {
  return (
    <main className={styles.main}>
      <div className={styles.timeScreen}>
        <FlexRow className={styles.timeRow}>
          <section className={styles.currentTime}>
            <p className={styles.greeting}>
              Good morning, it's currently
            </p>

            <div>
              <time className={styles.timeValue} dateTime="11:37">11:37</time>
              <span className={styles.timeZone}>BST</span>
              <p className={styles.location}>in London, UK</p>
            </div>
          </section>
        </FlexRow>
      </div>
    </main>
  );
};