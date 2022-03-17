import classNames from 'classnames';

import { FlexRow } from '../flex-row/FlexRow';
import { CurrentTime } from '../current-time/CurrentTime';
import styles from './ClockScreen.module.css';

export const ClockScreen = () => {
  return (
    <main className={styles.main}>
      <div className={styles.timeScreen}>
        <FlexRow className={styles.timeRow}>
          <CurrentTime />
        </FlexRow>
      </div>
    </main>
  );
};