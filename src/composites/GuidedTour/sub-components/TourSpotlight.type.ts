/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { HoleRect, TourSize } from '../behavior/tour-internal.type';

interface TourSpotlightProps {
  hole: HoleRect | null;
  view: TourSize;
  ringRef: RefObject<HTMLElement | null>;
}

export type { TourSpotlightProps };
