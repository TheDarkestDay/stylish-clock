import classNames from 'classnames';

import styles from './ExpandButton.module.css';

type Props = {
  onClick: () => void;
  collapsedAriaLabel: string;
  expandedAriaLabel: string;
  className?: string;
  isExpanded: boolean;
};

export const ExpandButton = ({onClick, collapsedAriaLabel, expandedAriaLabel, isExpanded, className}: Props) => {
  const buttonText = isExpanded ? 'Less' : 'More';

  const containerClassName = classNames(className);
  const buttonClassName = classNames(styles.expandButton, isExpanded && styles.expandButtonExpanded);
  const ariaLabel = isExpanded ? expandedAriaLabel : collapsedAriaLabel;
  
  return (
    <section className={containerClassName}>
      <button aria-label={ariaLabel} onClick={onClick} className={buttonClassName} type="button">
        <span className={classNames('fluidFontSize', styles.buttonCaption)}>
          {buttonText}
        </span>
      </button>
    </section>
  );
};