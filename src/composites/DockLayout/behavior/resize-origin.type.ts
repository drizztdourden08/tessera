/* @layer renderer-components @kind types */
interface ResizeOrigin {
  sizes: readonly number[];
  delta: number;
}

interface ResizeStep {
  delta: number;
  origin?: ResizeOrigin;
}

export type { ResizeOrigin, ResizeStep };
