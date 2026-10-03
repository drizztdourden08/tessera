/* @layer renderer-components @kind types */
import type { EmphasisAnchor, EmphasisOrder } from '../Emphasis.type';

interface EmphasisLettersProps {
  text: string;
  stagger: number;
  anchor: EmphasisAnchor;
  order: EmphasisOrder;
  seed?: number;
}

export type { EmphasisLettersProps };
