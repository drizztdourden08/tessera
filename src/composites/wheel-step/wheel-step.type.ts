/* @layer renderer-components @kind types */
import type { RefObject } from 'react';

interface WheelStep {
  direction: 1 | -1;
  fine: boolean;
}

interface WheelDelta {
  deltaX: number;
  deltaY: number;
  shiftKey: boolean;
}

interface WheelStepOptions {
  refs: readonly RefObject<HTMLElement | null>[];
  active: boolean;
  onStep: (step: WheelStep) => void;
  watch?: unknown;
}

export type { WheelDelta, WheelStep, WheelStepOptions };
