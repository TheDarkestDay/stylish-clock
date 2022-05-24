import { createContext } from 'react';

export type SlideContextValue = {
  onSlideUp: (panelHeight: number) => void;
  onSlideDown: () => void;
  isPanelExpanded: boolean;
  slidePanelHeight: number;
};

export const SlideContext = createContext<SlideContextValue>({
  onSlideUp: () => {},
  onSlideDown: () => {},
  isPanelExpanded: false,
  slidePanelHeight: 0,
});