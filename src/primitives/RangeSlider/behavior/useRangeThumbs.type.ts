/* @layer renderer-components @kind types */
import type { KeyboardEvent } from 'react';

type Thumb = 'low' | 'high';

interface RangeThumbs {
  active: Thumb;
  setActive: (thumb: Thumb) => void;
  setLow: (next: number) => void;
  setHigh: (next: number) => void;
  handleKey: (which: Thumb) => (event: KeyboardEvent<HTMLInputElement>) => void;
}

export type { Thumb, RangeThumbs };
