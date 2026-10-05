/* @layer renderer-components @kind types */
import type { KeyboardEvent, MouseEventHandler, Ref } from 'react';
import type { TheaterParams } from '../Video.type';

interface UseVideoPlayerParams extends TheaterParams {
  ref: Ref<HTMLVideoElement> | undefined;
  controls: boolean;
  className: string;
  onClick: MouseEventHandler<HTMLVideoElement> | undefined;
}

interface FramePropsParams {
  interactive: boolean;
  idle: boolean;
  theater: boolean;
  filled: boolean;
  className: string;
  attach: (node: HTMLElement | null) => void;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
  wake: () => void;
  sleep: () => void;
}

export type { FramePropsParams, UseVideoPlayerParams };
