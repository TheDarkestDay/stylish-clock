import classNames from 'classnames';

import { ReactComponent as RefreshIcon } from '../assets/desktop/icon-refresh.svg';
import { FlexRow } from '../flex-row/FlexRow';
import styles from './RandomQuote.module.css';
import { useRemoteQuote } from './use-remote-quote';

const ZENQUOTES_API_LINK = 'https://zenquotes.io/';

export const RandomQuote = () => {
  const { quote, isLoading, reload } = useRemoteQuote();

  const handleReloadButtonClick = () => {
    reload();
  };

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
                  inspirational quote got from <a className={styles.link} href={ZENQUOTES_API_LINK}>ZenQuotes API</a>
                </p>
            </>
        }
      </figure>

      <button onClick={handleReloadButtonClick} className={styles.refreshButton}>
        <RefreshIcon className={classNames(isLoading && styles.refreshIconSpinning)} />
      </button>
    </FlexRow>
  );
};