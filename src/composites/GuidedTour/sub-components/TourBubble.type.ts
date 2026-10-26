/* @layer renderer-components @kind types */
import type { RefCallback } from 'react';
import type { BubblePlace } from '../behavior/tour-internal.type';
import type { GuidedTourApi, TourAdvance, TourStep } from '../GuidedTour.type';

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

interface TourBubbleButtonsProps {
  tour: GuidedTourApi;
  step: TourStep;
  advance: TourAdvance;
}

export type { TourBubbleButtonsProps, TourBubbleCardProps, TourBubbleProps };
