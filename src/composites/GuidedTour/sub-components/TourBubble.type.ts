/* @layer renderer-components @kind types */
import type { RefCallback } from 'react';
import type { HoleRect } from '../behavior/tour-internal.type';
import type { GuidedTourApi, TourStep } from '../GuidedTour.type';

interface TourBubbleProps {
  tour: GuidedTourApi;
  step: TourStep;
  anchor: HTMLElement | null;
  hole: HoleRect | null;
  nodeRef: RefCallback<HTMLElement>;
}

interface TourBubbleCardProps {
  tour: GuidedTourApi;
  step: TourStep;
  id: string;
}

export type { TourBubbleCardProps, TourBubbleProps };
