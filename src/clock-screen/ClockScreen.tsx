import { useState, useEffect } from 'react';
import classNames from 'classnames';

import { FlexRow } from '../flex-row/FlexRow';
import { CurrentTime } from '../current-time/CurrentTime';
import { ExpandButton } from '../expand-button/ExpandButton';
import { RandomQuote } from '../random-quote/RandomQuote';
import { TimeDetails } from '../time-details/TimeDetails';
import { useClock } from './use-clock';
import styles from './ClockScreen.module.css';
import { getAddress, getAddressByIp } from '../firebase';

type State = {
  areDetailsExpanded: boolean;
  city?: string;
  country?: string;
  timeOfTheDay: 'day' | 'night';
};

const timeZoneReadableName = new Intl.DateTimeFormat().resolvedOptions().timeZone;

export const ClockScreen = () => {
  const [state, setState] = useState<State>({
    areDetailsExpanded: false,
    timeOfTheDay: 'day',
  });
  const currentTime = useClock();

  const { areDetailsExpanded, timeOfTheDay, country, city } = state;

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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      getAddress({ lat: latitude, long: longitude })
        .then((result) => {
          const { city, country } = result.data;

          setState((oldState) => {
            return {
              ...oldState,
              city,
              country,
            }
          });
        })
    }, () => {
        getAddressByIp()
          .then((result) => {
            const { city, country } = result.data;

            setState((oldState) => {
              return {
                ...oldState,
                city,
                country,
              }
            });
          });
    });
  }, [setState]);

  return (
    <main className={classNames(styles.main, timeOfTheDay === 'night' && styles.mainNight)}>
      <div className={styles.overlayContainer}>
        <div className={styles.timeScreen}>
          <RandomQuote className={classNames(areDetailsExpanded && styles.hidden)}/>
          
          <FlexRow className={styles.timeRow}>
            <CurrentTime value={currentTime} country={country} city={city} timeOfTheDay={timeOfTheDay} />

            <ExpandButton className={styles.expandButton} onClick={handleExpandButtonClick} isExpanded={areDetailsExpanded} />
          </FlexRow>
        </div>

        {areDetailsExpanded && <TimeDetails className={styles.timeDetails} theme={timeOfTheDay} currentTime={currentTime} timeZone={timeZoneReadableName}/>}
      </div>
    </main>
  );
};