/* @layer renderer-components @kind types */
import type { ReactNode, RefObject } from 'react';
import type { AnimatedMascotChoice } from '../../brand/AnimatedMascot/AnimatedMascot.type';
import type { MascotClip } from '../../brand/motion/mascot-clip.type';
import type { AnchoredPlacement } from '../../primitives/Anchored/Anchored.type';
import type { ShortcutListItem } from '../ShortcutList/ShortcutList.type';

type TourTarget = { readonly tour: string } | { readonly selector: string } | RefObject<HTMLElement | null>;

type TourAdvance = 'next' | 'click';

interface TourStep {
  readonly id: string;
  readonly title: string;
  readonly body: ReactNode;
  readonly target?: TourTarget;
  readonly placement?: AnchoredPlacement;
  readonly advance?: TourAdvance;
  readonly mascot?: MascotClip;
  readonly onEnter?: () => void | Promise<void>;
}

interface GuidedTourOptions {
  steps: readonly TourStep[];
  step?: number;
  onStepChange?: (step: number) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onFinish?: () => void;
}

interface GuidedTourApi {
  readonly steps: readonly TourStep[];
  readonly open: boolean;
  readonly index: number;
  readonly current: TourStep | null;
  readonly total: number;
  readonly shortcuts: readonly ShortcutListItem[];
  start: (at?: number) => void;
  next: () => void;
  back: () => void;
  goTo: (index: number) => void;
  close: () => void;
}

interface GuidedTourProps {
  tour: GuidedTourApi;
  mascot?: AnimatedMascotChoice | false;
  className?: string;
}

export type { GuidedTourApi, GuidedTourOptions, GuidedTourProps, TourAdvance, TourStep, TourTarget };
