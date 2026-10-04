/* @layer renderer-components @kind types */
interface ThumbSpan {
  fraction: number;
  progress: number;
  range: number;
}

interface SlimThumbs {
  y: ThumbSpan | null;
  x: ThumbSpan | null;
}

interface ThumbInsets {
  edge: number;
  ends: number;
  min: number;
}

interface ThumbPlace {
  start: number;
  end: number;
  ratio: number;
}

interface ThumbHit {
  along: 'y' | 'x';
  ratio: number;
}

interface ThumbDrag extends ThumbHit {
  pointer: number;
  start: number;
}

export type { SlimThumbs, ThumbDrag, ThumbHit, ThumbInsets, ThumbPlace, ThumbSpan };
