/* @layer renderer-components @kind types */
import type { MascotClip } from '../../motion/mascot-clip.type';
import type { Facing, MascotStageEvent, MascotStep, StepResult } from '../MascotStage.type';
import type { ActorRig } from './actor-rig.type';
import type { ClipSource, PoseSource } from './pose-source.type';
import type { PoseWriter } from './pose-writer.type';

interface QueuedStep {
  step: MascotStep;
  priority: number;
  /** A host command (resets the idle timer) rather than an autonomous one. */
  host: boolean;
  resolve: (result: StepResult) => void;
}

interface ActiveStep extends QueuedStep {
  phase: 'move' | 'play' | 'turn' | 'wait';
  clip?: MascotClip;
  started: number;
  endsAt: number;
}

interface ActorDom {
  wrap: HTMLElement;
  svg: SVGSVGElement;
  writer: PoseWriter;
}

/** A fade of one extra towards shown (1) or hidden (0), from the weight it had when asked. */
interface ExtraOverride {
  target: number;
  start: number;
  from: number;
  to: number;
}

interface Travel {
  target: number;
  speed: number;
  /** Plays the walk cycle (a step's move) rather than gliding to a stop after an interruption. */
  walking: boolean;
}

/** Animations the browser runs on its own: the ambient clip, and the current clip while it is settled. */
interface NativeRun {
  source: ClipSource | undefined;
  clip: readonly Animation[];
  ambient: readonly Animation[];
}

interface ActorCore {
  id: string;
  rig: ActorRig;
  rest: MascotClip;
  source: PoseSource;
  ambientStart: number;
  x: number;
  /** Where it lives: the autonomous mode wanders from here and naps here. */
  home: number;
  velocity: number;
  facing: Facing;
  turn: { from: number; to: number; start: number };
  travel: Travel | undefined;
  step: ActiveStep | undefined;
  queue: QueuedStep[];
  waiting: QueuedStep | undefined;
  overrides: Map<string, ExtraOverride>;
  bounds: { min: number; max: number };
  lastHost: number;
  reduced: boolean;
  /** Screen pixels per frame unit. */
  scale: number;
  dom: ActorDom | undefined;
  native: NativeRun;
  /** Fading in (to 1) or out (to 0); a hidden mascot stays on the stage as a state, its clips paused. */
  presence: { from: number; to: number; start: number };
  /** True while fully hidden: nothing is drawn or ticked for it. */
  away: boolean;
  emit: (event: Omit<MascotStageEvent, 'actor'>) => void;
}

export type { ActiveStep, ActorCore, ActorDom, ExtraOverride, NativeRun, QueuedStep, Travel };
