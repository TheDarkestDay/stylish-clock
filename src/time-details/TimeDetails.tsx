import classNames from 'classnames';
import { getISOWeek, getDayOfYear } from 'date-fns';

import { FlexRow } from '../flex-row/FlexRow';
import styles from './TimeDetails.module.css';

type Props = {
  theme?: 'day' | 'night';
  className?: string;
  timeZone: string;
  currentTime: Date;
};

export const TimeDetails = ({theme, className, timeZone, currentTime}: Props) => {
  const themeToApply = theme || 'day';

  const dayOfTheWeekNumber = currentTime.getDay();
  const weekNumber = getISOWeek(currentTime);
  const dayOfTheYearNumber = getDayOfYear(currentTime);

  return (
    <section className={classNames(styles.root, themeToApply === 'night' && styles.rootNight, className)}>
      <FlexRow className={styles.row}>
        <dl className={styles.fieldList}>
          <div className={styles.fieldsColumn}>
            <div className={styles.fieldDescription}>
              <dt className={classNames(styles.fieldName, 'fluidFontSize')}>Current timezone</dt>
              <dd className={classNames(styles.fieldValue, 'fluidFontSize')}>{timeZone}</dd>
            </div>

            <div className={styles.fieldDescription}>
              <dt className={classNames(styles.fieldName, 'fluidFontSize')}>Day of the year</dt>
              <dd className={classNames(styles.fieldValue, 'fluidFontSize')}>{dayOfTheYearNumber}</dd>
            </div>
          </div>
          
          <div className={styles.fieldsColumn}>
            <div className={styles.fieldDescription}>
              <dt className={classNames(styles.fieldName, 'fluidFontSize')}>Day of the week</dt>
              <dd className={classNames(styles.fieldValue, 'fluidFontSize')}>{dayOfTheWeekNumber}</dd>
            </div>

            <div className={styles.fieldDescription}>
              <dt className={classNames(styles.fieldName, 'fluidFontSize')}>Week number</dt>
              <dd className={classNames(styles.fieldValue, 'fluidFontSize')}>{weekNumber}</dd>
            </div>
          </div>
        </dl>
      </FlexRow>
    </section>
  );
};