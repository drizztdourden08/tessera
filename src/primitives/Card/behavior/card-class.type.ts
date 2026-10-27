/* @layer renderer-components @kind types */
import type { CardEdge, CardTone, CardVariant } from '../Card.type';

interface CardClassInput {
  variant: CardVariant;
  edgeTone?: CardTone;
  edge: CardEdge;
  headed: boolean;
  fill: boolean;
  className: string;
}

export type { CardClassInput };
