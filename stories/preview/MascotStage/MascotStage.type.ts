/* @layer stories @kind types */
import type { Ref } from 'react';
import type { AnimatedMascotBrand } from '../../../src/brand/AnimatedMascot/AnimatedMascot.type';
import type { MascotClip } from '../../../src/brand/motion/mascot-clip.type';
import type { AutonomyConfig } from './behavior/autonomy.type';

type Facing = 'left' | 'right';

type StepResult = 'done' | 'interrupted';

interface PlayOptions {
  at?: number;
  face?: Facing;
  loop?: boolean | number;
  blend?: number;
  speed?: number;
  priority?: number;
}

interface MoveOptions {
  clip?: 'move' | 'move-wobble';
  speed?: number;
  face?: Facing;
  priority?: number;
}

type MascotStep =
  | ({ play: MascotClip } & PlayOptions)
  | ({ moveTo: number } & MoveOptions)
  | { face: Facing }
  | { wait: number };

type EffectMode = 'auto' | 'show' | 'hide';

interface MascotActorState {
  x: number;
  facing: Facing;
  clip: MascotClip;
  moving: boolean;
  busy: boolean;
  queued: number;
  visible: boolean;
}

interface MascotActorHandle {
  readonly id: string;
  play: (clip: MascotClip, options?: PlayOptions) => Promise<StepResult>;
  moveTo: (x: number, options?: MoveOptions) => Promise<StepResult>;
  face: (facing: Facing) => Promise<StepResult>;
  queue: (steps: readonly MascotStep[]) => Promise<StepResult>;
  stop: () => void;
  effect: (id: string, mode: EffectMode) => void;
  effects: (mode: 'auto' | 'hide') => void;
  autonomy: (config: boolean | AutonomyConfig) => void;
  setVisible: (visible: boolean) => void;
  state: () => MascotActorState;
}

type MascotStageEventType = 'step-start' | 'step-end' | 'clip-start' | 'arrive' | 'idle' | 'behaviour';

interface MascotStageEvent {
  actor: string;
  type: MascotStageEventType;
  clip?: MascotClip;
  x?: number;
  result?: StepResult;
  behaviour?: string;
}

interface MascotStageCast {
  id: string;
  brand: AnimatedMascotBrand;
  x?: number;
  face?: Facing;
  clip?: MascotClip;
  rest?: MascotClip;
  size?: number;
  autonomy?: boolean | AutonomyConfig;
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
  Facing, MascotActorHandle, MascotStageCast, MascotStageEvent, MascotStageHandle, MascotStageProps, MascotStep, MoveOptions, PlayOptions, StepResult,
};
