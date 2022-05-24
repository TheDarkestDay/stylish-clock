import { ForwardedRef, forwardRef, useRef, useImperativeHandle, useEffect, useContext } from 'react';
import classNames from 'classnames';

import { SlideContext } from './slide-context';
import styles from './SlidePanel.module.css';

type Props = {
  children: React.ReactNode,
  open: boolean,
}

export type SlidePanelRef = {
  getContentHeight: () => number,
};

const _SlidePanel = ({children, open}: Props, forwardedRef: ForwardedRef<SlidePanelRef>) => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useImperativeHandle(forwardedRef, () => {
    return {
      getContentHeight: () => rootRef.current?.clientHeight || 0,
    }
  });

  const {onSlideUp, onSlideDown} = useContext(SlideContext);

  useEffect(() => {
    if (open) {
      onSlideUp(rootRef.current?.clientHeight || 0);
    } else {
      onSlideDown();
    }
  }, [open, onSlideUp, onSlideDown]);

  return (
    <div ref={rootRef} className={classNames(styles.root, open && styles.rootOpen)}>
      {children}
    </div>
  );
};

export const SlidePanel = forwardRef(_SlidePanel);