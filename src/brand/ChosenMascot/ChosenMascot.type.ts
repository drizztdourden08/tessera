/* @layer renderer-components @kind types */
import type { AnimatedMascotBrand, MascotAnimationNames } from '../AnimatedMascot/AnimatedMascot.type';
import type { BrandMarkSize } from '../BrandMark';
import type { BrandApp } from '../brand.type';

type MascotName = 'sentri' | 'flint';

type MascotChoice = MascotName | 'auto';

interface ChosenMascotProps {
  mascot?: MascotChoice;
  brand?: BrandApp;
  animation?: MascotAnimationNames[AnimatedMascotBrand];
  playing?: boolean;
  loop?: boolean;
  size?: BrandMarkSize;
  scale?: number;
  title?: string;
  className?: string;
}

type MascotRegistry = Readonly<Record<MascotName, AnimatedMascotBrand>>;

export type { ChosenMascotProps, MascotChoice, MascotName, MascotRegistry };
