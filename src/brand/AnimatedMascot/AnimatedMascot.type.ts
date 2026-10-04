/* @layer renderer-components @kind types */
import type { BrandMarkSize } from '../BrandMark';
import type { MascotClip } from '../motion/mascot-clip.type';

interface MascotAnimationNames {
  rotp: MascotClip;
  brock: MascotClip;
  archipelia: MascotClip;
}

type AnimatedMascotBrand = keyof MascotAnimationNames;

interface AnimatedMascotProps {
  brand: AnimatedMascotBrand;
  animation?: MascotClip;
  playing?: boolean;
  speed?: number;
  loop?: boolean;
  size?: BrandMarkSize;
  scale?: number;
  title?: string;
  className?: string;
  onFinish?: () => void;
}

export type { AnimatedMascotBrand, AnimatedMascotProps, MascotAnimationNames };
