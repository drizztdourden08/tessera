/* @layer renderer-components @kind types */
import type { StageEngine } from '../behavior/stage-engine.type';
import type { MascotStageCast } from '../MascotStage.type';

interface StageActorProps {
  cast: MascotStageCast;
  index: number;
  count: number;
  height: number;
  engine: StageEngine;
}

export type { StageActorProps };
