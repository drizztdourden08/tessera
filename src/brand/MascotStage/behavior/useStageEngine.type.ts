/* @layer renderer-components @kind types */
import type { MascotStageProps } from '../MascotStage.type';

type EngineOptions = Required<Pick<MascotStageProps, 'cast' | 'height' | 'playing' | 'speed' | 'motion'>> & Pick<MascotStageProps, 'onEvent'>;

export type { EngineOptions };
