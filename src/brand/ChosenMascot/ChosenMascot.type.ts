/* @layer renderer-components @kind types */
import type { AnimatedMascotBrand } from '../AnimatedMascot/AnimatedMascot.type';
import type { BrandMarkSize } from '../BrandMark';
import type { BrandApp } from '../brand.type';
import type { SentriAnimation } from '../sentri/sentri-motion.type';

type MascotName = 'sentri';

type MascotChoice = MascotName | 'auto';

interface ChosenMascotProps {
  mascot?: MascotChoice;
  brand?: BrandApp;
  animation?: SentriAnimation;
  playing?: boolean;
  loop?: boolean;
  size?: BrandMarkSize;
  scale?: number;
  title?: string;
  className?: string;
}

type MascotRegistry = Readonly<Record<MascotName, AnimatedMascotBrand>>;

export type { ChosenMascotProps, MascotChoice, MascotName, MascotRegistry };
