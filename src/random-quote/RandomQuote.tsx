import classNames from 'classnames';

import { ReactComponent as RefreshIcon } from '../assets/desktop/icon-refresh.svg';
import { FlexRow } from '../flex-row/FlexRow';
import styles from './RandomQuote.module.css';

export const RandomQuote = () => {
  return (
    <FlexRow className={styles.root} alignItems="start">
      <figure className={styles.figure}>
        <blockquote className={classNames(styles.quote, 'fluidFontSize')}>
         "The science of operations, as derived from mathematics more especially, is a science of itself, and has its own abstract truth and value.”
        </blockquote>

        <figcaption className={classNames(styles.author, 'fluidFontSize')}>
          Ada Lovelace
        </figcaption>
      </figure>

      <button className={styles.refreshButton}>
        <RefreshIcon />
      </button>
    </FlexRow>
  );
};