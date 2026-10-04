/* @layer stories @kind types */
import type { MascotStageCast, MascotStageEvent, MascotStageHandle } from '../MascotStage.type';
import type { StageActor } from './create-actor';
import type { StageClock } from './stage-clock';

interface StageStats {
  frames: number;
  busyMs: number;
  worstMs: number;
}

interface StageEngine {
  handle: MascotStageHandle;
  listener: { current?: ((event: MascotStageEvent) => void) | undefined };
  stats: StageStats;
  sync: (cast: readonly MascotStageCast[]) => void;
  attach: (id: string, wrap: HTMLElement, svg: SVGSVGElement, reduced: boolean) => () => void;
  resize: (width: number, height: number) => void;
  setReduced: (reduced: boolean) => void;
  setElement: (element: HTMLElement | null) => void;
  setPlaying: (playing: boolean) => void;
  setSpeed: (speed: number) => void;
  start: () => void;
  stop: () => void;
}

interface EngineState {
  clock: StageClock;
  actors: Map<string, StageActor>;
  casts: Map<string, MascotStageCast>;
  stats: StageStats;
  listener: { current?: ((event: MascotStageEvent) => void) | undefined };
  emit: (event: MascotStageEvent) => void;
  width: number;
  height: number;
  element: HTMLElement | null;
  frame: number;
  last: number;
}

export type { EngineState, StageEngine };
