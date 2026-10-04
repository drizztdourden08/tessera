/* @layer renderer-components @kind types */
import type { BrandMarkSize } from '../BrandMark';
import type { FlintAnimation } from '../flint/flint-motion.type';
import type { PelagoAnimation } from '../pelago/pelago-motion.type';
import type { SentriAnimation } from '../sentri/sentri-motion.type';

interface MascotAnimationNames {
  rotp: SentriAnimation;
  brock: FlintAnimation;
  archipelia: PelagoAnimation;
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
