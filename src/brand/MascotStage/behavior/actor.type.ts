/* @layer renderer-components @kind types */
import type { MascotClip } from '../../motion/mascot-clip.type';
import type { MascotFacing, MascotStageEvent, MascotStep, MascotStepResult } from '../MascotStage.type';
import type { ActorRig } from './actor-rig.type';
import type { ClipSource, PoseSource } from './pose-source.type';
import type { PoseWriter } from './pose-writer.type';

interface QueuedStep {
  step: MascotStep;
  priority: number;
  host: boolean;
  resolve: (result: MascotStepResult) => void;
}

interface ActiveStep extends QueuedStep {
  phase: 'move' | 'play' | 'turn' | 'wait';
  clip?: MascotClip;
  started: number;
  endsAt: number;
}

interface ActorDom {
  wrap: HTMLElement | undefined;
  svg: SVGSVGElement;
  writer: PoseWriter;
}

interface ExtraOverride {
  target: number;
  start: number;
  from: number;
  to: number;
}

interface Travel {
  target: number;
  speed: number;
  walking: boolean;
}

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
  home: number;
  spread: boolean;
  velocity: number;
  facing: MascotFacing;
  turn: { from: number; to: number; start: number };
  travel: Travel | undefined;
  step: ActiveStep | undefined;
  queue: QueuedStep[];
  waiting: QueuedStep | undefined;
  overrides: Map<string, ExtraOverride>;
  bounds: { min: number; max: number };
  lastHost: number;
  reduced: boolean;
  scale: number;
  dom: ActorDom | undefined;
  native: NativeRun;
  presence: { from: number; to: number; start: number };
  away: boolean;
  emit: (event: Omit<MascotStageEvent, 'actor'>) => void;
}

export type { ActiveStep, ActorCore, ActorDom, QueuedStep };
