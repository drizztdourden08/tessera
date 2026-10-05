/* @layer renderer-components @kind types */
import type { Ref } from 'react';
import type { AnimatedMascotBrand } from '../AnimatedMascot/AnimatedMascot.type';
import type { MascotClip } from '../motion/mascot-clip.type';
import type { MascotFacing } from '../motion/mascot-facing.type';
import type { MascotAutonomyConfig } from './behavior/autonomy.type';

type MascotStepResult = 'done' | 'interrupted';

interface MascotPlayOptions {
  at?: number;
  face?: MascotFacing;
  loop?: boolean | number;
  blend?: number;
  speed?: number;
  priority?: number;
}

interface MascotMoveOptions {
  clip?: 'move' | 'move-wobble';
  speed?: number;
  face?: MascotFacing;
  priority?: number;
}

type MascotStep =
  | ({ play: MascotClip } & MascotPlayOptions)
  | ({ moveTo: number } & MascotMoveOptions)
  | { face: MascotFacing }
  | { wait: number };

type MascotEffectMode = 'auto' | 'show' | 'hide';

interface MascotActorState {
  x: number;
  facing: MascotFacing;
  clip: MascotClip;
  moving: boolean;
  busy: boolean;
  queued: number;
  visible: boolean;
}

interface MascotActorHandle {
  readonly id: string;
  play: (clip: MascotClip, options?: MascotPlayOptions) => Promise<MascotStepResult>;
  moveTo: (x: number, options?: MascotMoveOptions) => Promise<MascotStepResult>;
  face: (facing: MascotFacing) => Promise<MascotStepResult>;
  turn: (facing: MascotFacing) => void;
  queue: (steps: readonly MascotStep[]) => Promise<MascotStepResult>;
  stop: () => void;
  effect: (id: string, mode: MascotEffectMode) => void;
  effects: (mode: 'auto' | 'hide') => void;
  autonomy: (config: boolean | MascotAutonomyConfig) => void;
  setVisible: (visible: boolean) => void;
  state: () => MascotActorState;
}

type MascotStageEventType = 'step-start' | 'step-end' | 'clip-start' | 'arrive' | 'idle' | 'behaviour';

interface MascotStageEvent {
  actor: string;
  type: MascotStageEventType;
  clip?: MascotClip;
  x?: number;
  result?: MascotStepResult;
  behaviour?: string;
}

interface MascotStageCast {
  id: string;
  brand: AnimatedMascotBrand;
  x?: number;
  face?: MascotFacing;
  clip?: MascotClip;
  rest?: MascotClip;
  size?: number;
  autonomy?: boolean | MascotAutonomyConfig;
  hidden?: boolean;
}

interface MascotStageHandle {
  actor: (id: string) => MascotActorHandle | undefined;
  width: () => number;
  stageX: (clientX: number) => number;
  stats: () => { frames: number; busyMs: number; worstMs: number };
}

interface MascotStageProps {
  cast: readonly MascotStageCast[];
  height?: number;
  playing?: boolean;
  speed?: number;
  motion?: 'system' | 'full' | 'reduced';
  className?: string;
  label?: string;
  onEvent?: (event: MascotStageEvent) => void;
  ref?: Ref<MascotStageHandle>;
}

export type {
  MascotActorHandle, MascotActorState, MascotEffectMode, MascotFacing, MascotMoveOptions, MascotPlayOptions, MascotStageCast, MascotStageEvent,
  MascotStageEventType, MascotStageHandle, MascotStageProps, MascotStep, MascotStepResult,
};
