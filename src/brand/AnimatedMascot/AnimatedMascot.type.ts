/* @layer renderer-components @kind types */
import type { BrandMarkSize } from '../BrandMark';
import type { MascotClip } from '../motion/mascot-clip.type';
import type { MascotFacing } from '../motion/mascot-facing.type';

interface MascotAnimationNames {
  rotp: MascotClip;
  brock: MascotClip;
  archipelia: MascotClip;
}

type AnimatedMascotBrand = keyof MascotAnimationNames;

type AnimatedMascotChoice = AnimatedMascotBrand | 'auto';

interface AnimatedMascotProps {
  brand: AnimatedMascotChoice;
  animation?: MascotClip;
  face?: MascotFacing;
  playing?: boolean;
  speed?: number;
  loop?: boolean;
  size?: BrandMarkSize;
  scale?: number;
  title?: string;
  className?: string;
  onFinish?: () => void;
}

export type { AnimatedMascotBrand, AnimatedMascotChoice, AnimatedMascotProps, MascotAnimationNames };
