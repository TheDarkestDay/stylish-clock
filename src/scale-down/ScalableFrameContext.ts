import { createContext } from 'react';

type ScalableFrameContextValue = {
  getFrameHeight: () => number;
};

export const ScalableFrameContext = createContext<ScalableFrameContextValue>({
  getFrameHeight: () => 0,
});