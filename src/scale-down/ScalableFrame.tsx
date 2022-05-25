import { useRef } from 'react';

import { ScalableFrameContext } from './ScalableFrameContext';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const ScalableFrame = ({children, className}: Props) => {
  const frameRef = useRef<HTMLDivElement | null>(null);

  const getFrameHeight = () => {
    if (frameRef.current == null) {
      return 0;
    }

    const frameElement = frameRef.current;
    const frameStyles = getComputedStyle(frameElement);
    const framePaddingTop = parseInt(frameStyles.paddingTop, 10);
    const framePaddingBottom = parseInt(frameStyles.paddingBottom, 10);

    return frameElement.offsetHeight - framePaddingTop - framePaddingBottom;
  };

  const contextValue = {
    getFrameHeight,
  };

  return (
    <div ref={frameRef} className={className}>
      <ScalableFrameContext.Provider value={contextValue}>
        {children}
      </ScalableFrameContext.Provider>
    </div>
  );
};