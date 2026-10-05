/* @layer renderer-components @kind types */
import type { AnimatedMascotBrand } from '../../../brand/AnimatedMascot/AnimatedMascot.type';
import type { MascotClip } from '../../../brand/motion/mascot-clip.type';
import type { MascotFacing } from '../../../brand/motion/mascot-facing.type';
import type { ShortcutKey } from '../../../primitives/Shortcut/Shortcut.type';
import type { TourStep } from '../GuidedTour.type';

type TourKeyAction = 'next' | 'back' | 'close';

interface TourKeyBinding {
  key: string;
  keys: readonly ShortcutKey[];
  action: TourKeyAction;
}

interface TourKeyContext {
  modified: boolean;
  editable: boolean;
  interactive: boolean;
  clickStep: boolean;
}

interface TourPosition {
  open: boolean;
  index: number;
}

interface TourOutcome extends TourPosition {
  finished: boolean;
}

type TourMove =
  | { type: 'start'; at: number }
  | { type: 'next' }
  | { type: 'back' }
  | { type: 'go'; index: number }
  | { type: 'close' };

interface TourBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface HoleRect extends TourBox {
  radius: number;
}

interface TourSize {
  width: number;
  height: number;
}

interface MascotSpot {
  x: number;
  y: number;
  face: MascotFacing;
}

interface MascotPresenting {
  brand: AnimatedMascotBrand | null;
  spot: MascotSpot | null;
  clip: MascotClip;
}

interface StepEntry {
  step: TourStep;
  find: () => HTMLElement | null;
  frame: () => Promise<void>;
  tries: number;
  warn?: (message: string) => void;
}

interface EnteredStep {
  index: number;
  target: HTMLElement | null;
}

interface TourStage {
  target: HTMLElement | null;
  step: TourStep | null;
  click: boolean;
  clip: MascotClip;
}

export type {
  EnteredStep, HoleRect, MascotPresenting, MascotSpot, StepEntry, TourBox, TourKeyAction, TourKeyBinding, TourKeyContext, TourMove,
  TourOutcome, TourPosition, TourSize, TourStage,
};
