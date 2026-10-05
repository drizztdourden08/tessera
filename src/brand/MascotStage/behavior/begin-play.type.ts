/* @layer renderer-components @kind types */
import type { MascotClip } from '../../motion/mascot-clip.type';
import type { MascotPlayOptions } from '../MascotStage.type';

type PlayStep = { play: MascotClip } & MascotPlayOptions;

export type { PlayStep };
