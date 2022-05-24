import { useContext } from 'react';
import classNames from 'classnames';

import styles from './SlideUp.module.css';
import { SlideContext } from './slide-context';

type Props = {
  children: React.ReactNode,
  className?: string;
}

export const SlideUp = ({children, className}: Props) => {
  const {slidePanelHeight, isPanelExpanded} = useContext(SlideContext);

  const style = isPanelExpanded
    ? {transform: `translateY(-${slidePanelHeight}px)`}
    : {};

  return (
    <div style={style} className={classNames(styles.slideUp, className)}>
      {children}
    </div>
  );
};