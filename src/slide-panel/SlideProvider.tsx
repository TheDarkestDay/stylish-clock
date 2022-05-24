import { useState, useCallback } from 'react';
import { SlideContext } from './slide-context';

type Props = {
  children: React.ReactNode,
  className?: string;
}

type State = {
  slidePanelHeight: number;
  isPanelExpanded: boolean;
};

export const SlideProvider = ({children, className}: Props) => {
  const [state, setState] = useState<State>({
    slidePanelHeight: 0,
    isPanelExpanded: false,
  });

  const { slidePanelHeight, isPanelExpanded } = state;

  const setSlidePanelHeight = (height: number) => {
    setState((oldState) => ({...oldState, slidePanelHeight: height}));
  };

  const onSlideUp = useCallback((slidePanelHeight) => {
    setState((oldState) => ({...oldState, slidePanelHeight, isPanelExpanded: true}));
  }, [setState]);

  const onSlideDown = useCallback(() => {
    setState((oldState) => ({...oldState, isPanelExpanded: false}));
  }, [setState]);

  const contextValue = {
    setSlidePanelHeight,
    onSlideUp,
    onSlideDown,
    isPanelExpanded,
    slidePanelHeight
  };

  return (
    <div className={className}>
      <SlideContext.Provider value={contextValue}>
        {children}
      </SlideContext.Provider>
    </div>
  );
};