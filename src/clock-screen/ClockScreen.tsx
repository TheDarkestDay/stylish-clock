import { useState } from 'react';

import { FlexRow } from '../flex-row/FlexRow';
import { CurrentTime } from '../current-time/CurrentTime';
import { ExpandButton } from '../expand-button/ExpandButton';
import styles from './ClockScreen.module.css';

type State = {
  areDetailsExpanded: boolean;
};

export const ClockScreen = () => {
  const [state, setState] = useState<State>({
    areDetailsExpanded: false,
  });

  const { areDetailsExpanded } = state;

  const handleExpandButtonClick = () => {
    setState((oldState) => ({
      ...oldState,
      areDetailsExpanded: !oldState.areDetailsExpanded,
    }));
  };

  return (
    <main className={styles.main}>
      <div className={styles.timeScreen}>
        <FlexRow className={styles.timeRow}>
          <CurrentTime />

          <ExpandButton className={styles.expandButton} onClick={handleExpandButtonClick} isExpanded={areDetailsExpanded} />
        </FlexRow>
      </div>
    </main>
  );
};