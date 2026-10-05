/* @layer renderer-components @kind types */
import type { RefCallback } from 'react';
import type { BubblePlace } from '../behavior/tour-internal.type';
import type { GuidedTourApi, TourStep } from '../GuidedTour.type';

interface TourBubbleProps {
  tour: GuidedTourApi;
  step: TourStep;
  place: BubblePlace | null;
  centred: boolean;
  nodeRef: RefCallback<HTMLElement>;
}

interface TourBubbleCardProps {
  tour: GuidedTourApi;
  step: TourStep;
  id: string;
}

export type { TourBubbleCardProps, TourBubbleProps };
