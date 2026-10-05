/* @layer stories @kind types */
import type { MascotClip, MascotFacing } from '../../../src/brand';

type MascotPlaygroundArgs = {
  animation: MascotClip | 'none';
  speed: number;
  loop: boolean;
  face: MascotFacing;
  playing: boolean;
  variant: string;
  scale: number;
  lookX: number;
  lookY: number;
  limbLeft: number;
  limbRight: number;
};

export type { MascotPlaygroundArgs };
