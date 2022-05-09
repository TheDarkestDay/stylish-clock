import classNames from 'classnames';

import { ReactComponent as RefreshIcon } from '../assets/desktop/icon-refresh.svg';
import { FlexRow } from '../flex-row/FlexRow';
import styles from './RandomQuote.module.css';
import { useRemoteQuote } from './use-remote-quote';

export const RandomQuote = () => {
  const { quote, isLoading, attributionLink } = useRemoteQuote();

  return (
    <FlexRow className={styles.root} alignItems="start">
      <figure className={styles.figure}>
        {
          isLoading 
            ? <p>Loading...</p>
            : <>
                <blockquote className={classNames(styles.quote, 'fluidFontSize')}>
                  "{quote?.text}”
                </blockquote>
      
                <figcaption className={classNames(styles.author, 'fluidFontSize')}>
                  {quote?.author}
                </figcaption>
        
                <p className={styles.attribution}>
                  inspirational quote got from <a className={styles.link} href={attributionLink}>ZenQuotes API</a>
                </p>
            </>
        }
      </figure>

      <button className={styles.refreshButton}>
        <RefreshIcon />
      </button>
    </FlexRow>
  );
};