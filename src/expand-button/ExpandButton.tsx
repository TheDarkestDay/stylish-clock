import classNames from 'classnames';

import styles from './ExpandButton.module.css';

type Props = {
  onClick: () => void;
  className?: string;
  isExpanded: boolean;
};

export const ExpandButton = ({onClick, isExpanded, className}: Props) => {
  const buttonText = isExpanded ? 'Less' : 'More';

  const containerClassName = classNames(className);
  const buttonClassName = classNames(styles.expandButton, isExpanded && styles.expandButtonExpanded);
  
  return (
    <section className={containerClassName}>
      <button onClick={onClick} className={buttonClassName}>
        <span className={styles.buttonCaption}>
          {buttonText}
        </span>
      </button>
    </section>
  );
};