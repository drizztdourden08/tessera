/* @layer renderer-components @kind types */
import type { Ref } from 'react';
import type { AnimatedMascotBrand } from '../AnimatedMascot/AnimatedMascot.type';
import type { MascotClip } from '../motion/mascot-clip.type';
import type { AutonomyConfig } from './behavior/autonomy.type';

/** Which way the mascot looks. The drawings face right; left mirrors the rig and keeps symbols upright. */
type Facing = 'left' | 'right';

/** How a step ended: it ran to its end, or a later command took over. */
type StepResult = 'done' | 'interrupted';

interface PlayOptions {
  /** Walk to this x first (stage pixels, the mascot's foot centre), then play there. */
  at?: number;
  /** Turn to face this way first. */
  face?: Facing;
  /** true repeats until the next command; a number plays that many times. Default: the clip's own loop. */
  loop?: boolean | number;
  /** Cross-fade length in milliseconds from whatever is showing now. Default: the transition rules. */
  blend?: number;
  /** Playback speed of this clip: 1 normal. */
  speed?: number;
  /** 0 for autonomous choices, 1 for the host (default), 2 for urgent. A lower one waits for a protected moment to pass. */
  priority?: number;
}

interface MoveOptions {
  /** The walk cycle played while travelling. */
  clip?: 'move' | 'move-wobble';
  /** Top speed in stage pixels per second. */
  speed?: number;
  /** Which way to look while travelling. Default: the way it travels. */
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
}

/** The imperative controller of one mascot on the stage. */
interface MascotActorHandle {
  readonly id: string;
  play: (clip: MascotClip, options?: PlayOptions) => Promise<StepResult>;
  moveTo: (x: number, options?: MoveOptions) => Promise<StepResult>;
  face: (facing: Facing) => Promise<StepResult>;
  /** Appends steps after the current one; the promise settles when the last one ends. */
  queue: (steps: readonly MascotStep[]) => Promise<StepResult>;
  /** Clears the queue and settles into the rest clip. */
  stop: () => void;
  /** Fades one extra (an effect such as question or laptop) in or out over the clip's own choice. */
  effect: (id: string, mode: EffectMode) => void;
  /** Fades every extra out (hide) or hands them back to the clips (auto). */
  effects: (mode: 'auto' | 'hide') => void;
  autonomy: (config: boolean | AutonomyConfig) => void;
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
  /** Starting x, and where it walks to when this changes. Default: spread across the stage. */
  x?: number;
  face?: Facing;
  /** A state to hold: a looping clip loops; a single clip plays once and rests. Changing it transitions. */
  clip?: MascotClip;
  /** The clip it settles into when nothing else is asked. Default: idle. */
  rest?: MascotClip;
  /** Height of this mascot's frame as a share of the stage height. Default 1. */
  size?: number;
  autonomy?: boolean | AutonomyConfig;
}

interface MascotStageHandle {
  actor: (id: string) => MascotActorHandle | undefined;
  width: () => number;
  /** The engine's own work per frame so far: frames drawn, total and worst milliseconds. */
  stats: () => { frames: number; busyMs: number; worstMs: number };
}

interface MascotStageProps {
  cast: readonly MascotStageCast[];
  /** Fixed stage height in pixels. The width follows the container. Default 160. */
  height?: number;
  playing?: boolean;
  speed?: number;
  className?: string;
  label?: string;
  onEvent?: (event: MascotStageEvent) => void;
  ref?: Ref<MascotStageHandle>;
}

export type {
  EffectMode, Facing, MascotActorHandle, MascotActorState, MascotStageCast, MascotStageEvent, MascotStageEventType, MascotStageHandle,
  MascotStageProps, MascotStep, MoveOptions, PlayOptions, StepResult,
};
