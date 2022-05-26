import { useContext } from 'react';
import classNames from 'classnames';

import styles from './SlideUp.module.css';
import { SlideContext } from './slide-context';

type Props = {
  children: React.ReactNode,
  onSlideEnd: (direction: SlideDirection) => void;
  className?: string;
}

export type SlideDirection = 'up' | 'down';

export const SlideUp = ({children, className, onSlideEnd}: Props) => {
  const {slidePanelHeight, isPanelExpanded} = useContext(SlideContext);

  const style = isPanelExpanded
    ? {transform: `translateY(-${slidePanelHeight}px)`}
    : {};

  const handleTransitionEnd = () => {
    onSlideEnd(isPanelExpanded ? 'up' : 'down');
  };

  return (
    <div style={style} onTransitionEnd={handleTransitionEnd} className={classNames(styles.slideUp, className)}>
      {children}
    </div>
  );
};