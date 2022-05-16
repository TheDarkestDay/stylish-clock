import classNames from 'classnames';

import { ReactComponent as RefreshIcon } from '../assets/desktop/icon-refresh.svg';
import { FlexRow } from '../flex-row/FlexRow';
import styles from './RandomQuote.module.css';
import { useRemoteQuote } from './use-remote-quote';

const ZENQUOTES_API_LINK = 'https://zenquotes.io/';

type Props = {
  className?: string;
};

export const RandomQuote = ({className}: Props) => {
  const { quote, isLoading, reload } = useRemoteQuote();

  const handleReloadButtonClick = () => {
    reload();
  };

  return (
    <FlexRow className={classNames(styles.root, className)} alignItems="start">
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
        
                <p className={classNames(styles.attribution, 'fluidFontSize')}>
                  Inspirational quote got from <a className={styles.link} href={ZENQUOTES_API_LINK}>ZenQuotes API</a>
                </p>
            </>
        }
      </figure>

      <button aria-label="Reload quote" onClick={handleReloadButtonClick} className={styles.refreshButton}>
        <RefreshIcon aria-hidden="true" className={classNames(isLoading && styles.refreshIconSpinning)} />
      </button>
    </FlexRow>
  );
};