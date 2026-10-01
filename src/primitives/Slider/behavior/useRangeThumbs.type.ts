/* @layer renderer-components @kind types */
import type { RefObject } from 'react';

type Thumb = 'low' | 'high';

interface RangeThumbs {
  low: number;
  high: number;
  lowOnTop: boolean;
  lowRef: RefObject<HTMLInputElement | null>;
  highRef: RefObject<HTMLInputElement | null>;
  setLow: (next: number) => void;
  setHigh: (next: number) => void;
  setActive: (thumb: Thumb) => void;
  pickTrack: (fraction: number) => void;
}

export type { RangeThumbs, Thumb };
