/* @layer renderer-components @kind types */
import type { BrandMarkSize } from '../BrandMark';
import type { SentriAnimation } from '../sentri/sentri-motion.type';

interface MascotAnimationNames {
  rotp: SentriAnimation;
}

type AnimatedMascotBrand = keyof MascotAnimationNames;

interface AnimatedMascotProps<B extends AnimatedMascotBrand = AnimatedMascotBrand> {
  brand: B;
  animation?: MascotAnimationNames[B];
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
