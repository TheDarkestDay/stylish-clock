import { useContext, useRef } from 'react';
import { SlideContext } from '../slide-panel';
import classNames from 'classnames';

import { ScalableFrameContext } from './ScalableFrameContext';
import styles from './ScaleDown.module.css';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const ScaleDown = ({children, className}: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { isPanelExpanded, slidePanelHeight } = useContext(SlideContext);
  const { getFrameHeight } = useContext(ScalableFrameContext);

  let scale = 1;
  if (isPanelExpanded && containerRef.current) {
    const containerHeight = containerRef.current.offsetHeight;
    const availableHeight = getFrameHeight() - slidePanelHeight;

    if (containerHeight > availableHeight) {
      scale = availableHeight / containerHeight;
    }
  }

  const style = {transform: `scale(${scale})`};

  return (
    <div ref={containerRef} style={style} className={classNames(styles.scaleDown, className)}>
      {children}
    </div>
  );
};