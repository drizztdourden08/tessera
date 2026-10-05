/* @layer renderer-components @kind types */
import type { AnimatedMascotBrand } from '../../../brand/AnimatedMascot/AnimatedMascot.type';
import type { MascotClip } from '../../../brand/motion/mascot-clip.type';
import type { MascotFacing } from '../../../brand/motion/mascot-facing.type';
import type { MascotMoveOptions } from '../../../brand/MascotStage/MascotStage.type';
import type { RefObject } from 'react';
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
  waits: boolean;
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

type ClipPoint = readonly [number, number];

type TourSide = 'top' | 'bottom' | 'left' | 'right';

type TourAlign = 'start' | 'end' | 'center';

interface BubblePlace {
  box: TourBox;
  side: TourSide | 'inside';
}

interface HoleRect extends TourBox {
  radius: number;
}

interface TourSize {
  width: number;
  height: number;
}

type MascotStand = readonly [number, number];

interface MascotSpot {
  x: number;
  y: number;
  face: MascotFacing;
}

interface MascotCue {
  clip: MascotClip;
  walk?: MascotMoveOptions['clip'];
}

interface MascotPresenting extends MascotCue {
  brand: AnimatedMascotBrand | null;
  spot: MascotSpot | null;
}

interface TargetSeek {
  find: () => HTMLElement | null;
  frame: () => Promise<void>;
  tries: number;
  signal: AbortSignal;
}

interface StepEntry extends TargetSeek {
  step: TourStep;
  warn?: (message: string) => void;
}

interface EnteredStep {
  index: number;
  id: string;
  target: HTMLElement | null;
}

interface EntryState {
  entering: boolean;
  shown: boolean;
  target: HTMLElement | null;
}

interface TourStage {
  target: HTMLElement | null;
  step: TourStep | null;
  click: boolean;
  waits: boolean;
  cue: MascotCue;
}

interface TourReach {
  reachable: HTMLElement[];
  holes: HTMLElement[];
}

interface SpotHoles {
  hole: HoleRect | null;
  kept: readonly HoleRect[];
}

interface SpotlightState extends SpotHoles {
  view: TourSize;
  ringRef: RefObject<HTMLElement | null>;
}

export type {
  BubblePlace, TourAlign, TourSide,
  ClipPoint, EnteredStep, EntryState, HoleRect, MascotCue, MascotPresenting, MascotSpot, MascotStand, SpotHoles, SpotlightState, StepEntry, TargetSeek,
  TourBox, TourKeyAction, TourKeyBinding, TourKeyContext, TourMove, TourOutcome, TourPosition, TourReach, TourSize, TourStage,
};
