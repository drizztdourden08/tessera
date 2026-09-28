/* @layer renderer-components @kind types */
import type { HTMLAttributes } from 'react';
import type { MouseButton, ShortcutKey } from '../../primitives';
import type { KeyboardSize, KeyboardTarget, KeyRect } from '../KeyboardLayout';
import type { MOUSE_TARGET } from './ShortcutTour.constants';

type TourTarget = KeyboardTarget | typeof MOUSE_TARGET;

type TourFocus = number | 'all';

interface TourFrame {
  focus: TourFocus;
  held: number;
  wait: number;
}

interface TourFrameParams {
  count: number;
  zoomOut: boolean;
  loop: boolean;
  still: boolean;
}

interface TourParams {
  keys: readonly ShortcutKey[];
  mouse: MouseButton | undefined;
  zoomOut: boolean;
  loop: boolean;
  size: KeyboardSize;
}

interface ViewportSize {
  width: number;
  height: number;
}

interface TourScene {
  viewport: ViewportSize;
  world: ViewportSize;
  mouse: KeyRect | null;
}

interface CameraView {
  x: number;
  y: number;
  scale: number;
}

interface ShortcutTourProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  keys: readonly ShortcutKey[];
  mouse?: MouseButton;
  zoomOut?: boolean;
  loop?: boolean;
  speed?: number;
  size?: KeyboardSize;
}

export type {
  CameraView, ShortcutTourProps, TourFocus, TourFrame, TourFrameParams, TourParams, TourScene, TourTarget,
};
