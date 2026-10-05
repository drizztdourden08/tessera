/* @layer renderer-components @kind types */
import type { TourTarget } from '../GuidedTour.type';

type TourSpotTarget = TourTarget | HTMLElement;

interface TourSpotProps {
  target: TourSpotTarget | null;
  keep?: readonly TourSpotTarget[];
  className?: string;
}

export type { TourSpotProps, TourSpotTarget };
