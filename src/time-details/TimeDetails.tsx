import classNames from 'classnames';

import { FlexRow } from '../flex-row/FlexRow';
import styles from './TimeDetails.module.css';

type Props = {
  theme?: 'day' | 'night';
};

export const TimeDetails = ({theme}: Props) => {
  const themeToApply = theme || 'day';

  return (
    <section className={classNames(styles.root, themeToApply === 'night' && styles.rootNight)}>
      <FlexRow>
        <dl className={styles.fieldList}>
          <div className={styles.fieldDescription}>
            <dt className={classNames(styles.fieldName, 'fluidFontSize')}>Current timezone</dt>
            <dd className={classNames(styles.fieldValue, 'fluidFontSize')}>Europe/London</dd>
          </div>

          <div className={styles.fieldDescription}>
            <dt className={classNames(styles.fieldName, 'fluidFontSize')}>Day of the year</dt>
            <dd className={classNames(styles.fieldValue, 'fluidFontSize')}>295</dd>
          </div>
          
          <div className={styles.fieldDescription}>
            <dt className={classNames(styles.fieldName, 'fluidFontSize')}>Day of the week</dt>
            <dd className={classNames(styles.fieldValue, 'fluidFontSize')}>5</dd>
          </div>

          <div className={styles.fieldDescription}>
            <dt className={classNames(styles.fieldName, 'fluidFontSize')}>Week number</dt>
            <dd className={classNames(styles.fieldValue, 'fluidFontSize')}>42</dd>
          </div>
        </dl>
      </FlexRow>
    </section>
  );
};