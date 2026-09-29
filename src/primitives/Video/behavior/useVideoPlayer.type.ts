/* @layer renderer-components @kind types */
import type { KeyboardEvent, MouseEventHandler, Ref } from 'react';

interface UseVideoPlayerParams {
  ref: Ref<HTMLVideoElement> | undefined;
  controls: boolean;
  onClick: MouseEventHandler<HTMLVideoElement> | undefined;
}

interface FramePropsParams {
  interactive: boolean;
  idle: boolean;
  attach: (node: HTMLDivElement | null) => void;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
  wake: () => void;
  sleep: () => void;
}

export type { FramePropsParams, UseVideoPlayerParams };
