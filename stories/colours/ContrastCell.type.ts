/* @layer stories @kind types */
import type { ContrastPair } from '../tokens/token-lists';

type ContrastColumn = 'sample' | 'ratio' | 'text' | 'large';

interface ContrastCellProps {
  pair: ContrastPair;
  column: ContrastColumn;
  sample: string;
  thresholds: { text: number; large: number };
}

export type { ContrastCellProps, ContrastColumn };
