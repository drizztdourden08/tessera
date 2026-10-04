/* @layer renderer-components @kind types */
import type { MascotStageCast, MascotStageEvent, MascotStageHandle } from '../MascotStage.type';

/** Frame cost of the engine's own work (sampling, blending, writing), summed over frames. */
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
  setPlaying: (playing: boolean) => void;
  setSpeed: (speed: number) => void;
  start: () => void;
  stop: () => void;
}

export type { StageEngine, StageStats };
