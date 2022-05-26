import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';

import { FlexRow } from '../flex-row/FlexRow';
import { CurrentTime } from '../current-time/CurrentTime';
import { ExpandButton } from '../expand-button/ExpandButton';
import { RandomQuote } from '../random-quote/RandomQuote';
import { TimeDetails, TimeDetailsRef } from '../time-details/TimeDetails';
import { useClock } from './use-clock';
import styles from './ClockScreen.module.css';
import { getAddress, getAddressByIp } from '../firebase';
import { ScalableFrame, ScaleDown } from '../scale-down';
import { SlideProvider, SlidePanel, SlideUp, SlideDirection  } from '../slide-panel';

type State = {
  areDetailsExpanded: boolean;
  canShowRandomQuote: boolean;
  city?: string;
  country?: string;
  timeOfTheDay: 'day' | 'night';
};

const timeZoneReadableName = new Intl.DateTimeFormat().resolvedOptions().timeZone;

export const ClockScreen = () => {
  const [state, setState] = useState<State>({
    areDetailsExpanded: false,
    canShowRandomQuote: true,
    timeOfTheDay: 'day',
  });
  const currentTime = useClock();
  const timeDetailsRef = useRef<TimeDetailsRef | null>(null);

  const { areDetailsExpanded, timeOfTheDay, country, city, canShowRandomQuote } = state;

  const handleExpandButtonClick = () => {
    setState((oldState) => ({
      ...oldState,
      areDetailsExpanded: !oldState.areDetailsExpanded,
      canShowRandomQuote: false,
    }));
  };

  const handleSlideEnd = (direction: SlideDirection) => {
    if (direction === 'down') {
      setState((oldState) => ({...oldState, canShowRandomQuote: true}));
    }
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
    const timeDetailsElement = timeDetailsRef.current;

    if (areDetailsExpanded) {
      timeDetailsElement?.focusContent(); 
    }
  }, [areDetailsExpanded, setState]);

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
      <SlideProvider className={styles.overlayContainer}>
        <ScalableFrame className={styles.timeScreen}>
          <RandomQuote className={classNames(!canShowRandomQuote && styles.hidden)}/>

          <SlideUp onSlideEnd={handleSlideEnd} className={styles.timeSlideContainer}>
            <FlexRow className={classNames(styles.timeRow)}>
              <ScaleDown>
                <CurrentTime value={currentTime} country={country} city={city} timeOfTheDay={timeOfTheDay} />
              </ScaleDown>

              <ExpandButton collapsedAriaLabel="Show details" expandedAriaLabel="Hide details" className={styles.expandButton} onClick={handleExpandButtonClick} isExpanded={areDetailsExpanded} />
            </FlexRow>
          </SlideUp>
        </ScalableFrame>

        <SlidePanel open={areDetailsExpanded}>
          <TimeDetails ref={timeDetailsRef} className={styles.timeDetails} theme={timeOfTheDay} currentTime={currentTime} timeZone={timeZoneReadableName}/>
        </SlidePanel>
      </SlideProvider>
    </main>
  );
};