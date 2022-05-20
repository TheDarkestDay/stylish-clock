import { ForwardedRef, forwardRef, useRef, useImperativeHandle } from 'react';
import classNames from 'classnames';

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

  return (
    <div ref={rootRef} className={classNames(styles.root, open && styles.rootOpen)}>
      {children}
    </div>
  );
};

export const SlidePanel = forwardRef(_SlidePanel);