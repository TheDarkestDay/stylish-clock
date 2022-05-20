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
import { SlidePanel, SlidePanelRef } from '../slide-panel/SlidePanel';

type State = {
  areDetailsExpanded: boolean;
  city?: string;
  country?: string;
  timeOfTheDay: 'day' | 'night';
  timeRowSlideStyle?: React.CSSProperties;
};

const timeZoneReadableName = new Intl.DateTimeFormat().resolvedOptions().timeZone;

export const ClockScreen = () => {
  const [state, setState] = useState<State>({
    areDetailsExpanded: false,
    timeOfTheDay: 'day',
  });
  const currentTime = useClock();
  const timeDetailsRef = useRef<TimeDetailsRef | null>(null);
  const timeDetailsPanelRef = useRef<SlidePanelRef | null>(null);

  const { areDetailsExpanded, timeOfTheDay, country, city, timeRowSlideStyle } = state;

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
    const timeDetailsElement = timeDetailsRef.current;
    const timeDetailsPanelElement = timeDetailsPanelRef.current;

    if (areDetailsExpanded) {
      timeDetailsElement?.focusContent();
      
      if (timeDetailsPanelElement !== null) {
        setState((oldState) => ({
          ...oldState,
          timeRowSlideStyle: {
            transform: `translateY(-${timeDetailsPanelElement.getContentHeight()}px)`,
          },
        }));
      }
    } else {
      setState((oldState) => ({
        ...oldState,
        timeRowSlideStyle: {
          transform: 'translateY(0)',
        },
      }));
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
      <div className={styles.overlayContainer}>
        <div className={styles.timeScreen}>
          <RandomQuote className={classNames(areDetailsExpanded && styles.hidden)}/>
          
          <FlexRow style={timeRowSlideStyle} className={classNames(styles.timeRow)}>
            <CurrentTime value={currentTime} country={country} city={city} timeOfTheDay={timeOfTheDay} />

            <ExpandButton collapsedAriaLabel="Show details" expandedAriaLabel="Hide details" className={styles.expandButton} onClick={handleExpandButtonClick} isExpanded={areDetailsExpanded} />
          </FlexRow>
        </div>

        <SlidePanel ref={timeDetailsPanelRef} open={areDetailsExpanded}>
          <TimeDetails ref={timeDetailsRef} className={styles.timeDetails} theme={timeOfTheDay} currentTime={currentTime} timeZone={timeZoneReadableName}/>
        </SlidePanel>
      </div>
    </main>
  );
};