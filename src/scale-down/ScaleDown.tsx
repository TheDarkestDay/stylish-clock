import { useContext, useRef, useEffect, useState, useCallback } from 'react';
import { SlideContext } from '../slide-panel';
import classNames from 'classnames';

import { ScalableFrameContext } from './ScalableFrameContext';
import styles from './ScaleDown.module.css';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const ScaleDown = ({children, className}: Props) => {
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { isPanelExpanded, slidePanelHeight } = useContext(SlideContext);
  const { getFrameHeight } = useContext(ScalableFrameContext);

  const getNewScale = useCallback(() => {
    if (containerRef.current === null) {
      return 1;
    }

    const containerHeight = containerRef.current.offsetHeight;
    const availableHeight = getFrameHeight() - slidePanelHeight;

    if (containerHeight > availableHeight) {
      return availableHeight / containerHeight;
    }

    return 1;
  }, [getFrameHeight, slidePanelHeight]);

  useEffect(() => {
    let newScale = 1;

    if (isPanelExpanded && containerRef.current) {
      newScale = getNewScale();
    }

    setScale(newScale);
  }, [isPanelExpanded, setScale, getNewScale]);

  useEffect(() => {
    const handleResize = () => {
      if (isPanelExpanded) {
        setScale(getNewScale());
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [setScale, getNewScale, isPanelExpanded]);

  const style = {transform: `scale(${scale})`};

  return (
    <div ref={containerRef} style={style} className={classNames(styles.scaleDown, className)}>
      {children}
    </div>
  );
};