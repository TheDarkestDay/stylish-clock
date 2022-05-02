import { useState, useEffect } from 'react';
import classNames from 'classnames';

import { FlexRow } from '../flex-row/FlexRow';
import { CurrentTime } from '../current-time/CurrentTime';
import { ExpandButton } from '../expand-button/ExpandButton';
import { RandomQuote } from '../random-quote/RandomQuote';
import { TimeDetails } from '../time-details/TimeDetails';
import { useClock } from './use-clock';
import styles from './ClockScreen.module.css';

type State = {
  areDetailsExpanded: boolean;
  timeOfTheDay: 'day' | 'night';
};

const timeZoneReadableName = new Intl.DateTimeFormat().resolvedOptions().timeZone;

export const ClockScreen = () => {
  const [state, setState] = useState<State>({
    areDetailsExpanded: false,
    timeOfTheDay: 'day',
  });
  const currentTime = useClock();

  const { areDetailsExpanded, timeOfTheDay } = state;

  const handleExpandButtonClick = () => {
    setState((oldState) => ({
      ...oldState,
      areDetailsExpanded: !oldState.areDetailsExpanded,
    }));
  };

  useEffect(() => {
    const hours = currentTime.getHours();

    const actualTimeOfTheDay = hours >= 6 && hours < 18 ? 'day' : 'night';
    
    if (actualTimeOfTheDay !== timeOfTheDay) {
      setState((oldState) => ({
        ...oldState,
        timeOfTheDay: actualTimeOfTheDay,
      }));  
    }
  }, [currentTime, timeOfTheDay, setState]);

  return (
    <main className={classNames(styles.main, timeOfTheDay === 'night' && styles.mainNight)}>
      <div className={styles.overlayContainer}>
        <div className={styles.timeScreen}>
          {!areDetailsExpanded && <RandomQuote />}
          
          <FlexRow className={styles.timeRow}>
            <CurrentTime value={currentTime} />

            <ExpandButton className={styles.expandButton} onClick={handleExpandButtonClick} isExpanded={areDetailsExpanded} />
          </FlexRow>
        </div>

        {areDetailsExpanded && <TimeDetails theme={timeOfTheDay} currentTime={currentTime} timeZone={timeZoneReadableName}/>}
      </div>
    </main>
  );
};