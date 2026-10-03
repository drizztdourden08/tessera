/* @layer root-config @kind types */
import type { ReviewColour, ReviewStatus } from './review.type';

interface ReviewOption {
  status: ReviewStatus;
  colour: ReviewColour;
  icon: string;
  label: string;
  changed: string;
}

export type { ReviewOption };
