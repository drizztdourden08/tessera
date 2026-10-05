/* @layer renderer-components @kind types */
import type { ReactNode, RefObject } from 'react';
import type { AnimatedMascotChoice } from '../../brand/AnimatedMascot/AnimatedMascot.type';
import type { MascotMoveOptions } from '../../brand/MascotStage/MascotStage.type';
import type { MascotClip } from '../../brand/motion/mascot-clip.type';
import type { AnchoredPlacement } from '../../primitives/Anchored/Anchored.type';
import type { ShortcutListItem } from '../ShortcutList/ShortcutList.type';

type TourTarget = { readonly tour: string } | { readonly selector: string } | RefObject<HTMLElement | null>;

type TourAdvance = 'next' | 'click' | 'wait';

interface TourMascotMove {
  readonly walk?: MascotMoveOptions['clip'];
  readonly arrive: MascotClip;
}

type TourStepMascot = MascotClip | TourMascotMove;

interface TourEnterContext {
  readonly signal: AbortSignal;
}

interface TourStep {
  readonly id: string;
  readonly title: string;
  readonly body: ReactNode;
  readonly target?: TourTarget;
  readonly placement?: AnchoredPlacement;
  readonly advance?: TourAdvance;
  readonly clickTarget?: TourTarget;
  readonly hint?: ReactNode;
  readonly mascot?: TourStepMascot;
  readonly onEnter?: (context: TourEnterContext) => void | Promise<void>;
}

interface GuidedTourOptions {
  steps: readonly TourStep[];
  step?: number;
  onStepChange?: (step: number) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onFinish?: () => void;
  onStepShown?: (step: TourStep, index: number, target: HTMLElement | null) => void;
  onStepLeave?: (step: TourStep, index: number) => void;
}

interface GuidedTourApi {
  readonly steps: readonly TourStep[];
  readonly open: boolean;
  readonly index: number;
  readonly current: TourStep | null;
  readonly total: number;
  readonly shortcuts: readonly ShortcutListItem[];
  readonly entering: boolean;
  readonly shown: boolean;
  readonly target: HTMLElement | null;
  start: (at?: number) => void;
  next: () => void;
  back: () => void;
  goTo: (index: number) => void;
  close: () => void;
}

interface GuidedTourProps {
  tour: GuidedTourApi;
  keep?: readonly TourTarget[];
  mascot?: AnimatedMascotChoice | false;
  className?: string;
}

export type {
  GuidedTourApi, GuidedTourOptions, GuidedTourProps, TourAdvance, TourEnterContext, TourMascotMove, TourStep, TourStepMascot, TourTarget,
};
