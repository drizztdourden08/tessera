/* @layer renderer-components @kind types */
import type { AnimatedMascotBrand } from '../AnimatedMascot/AnimatedMascot.type';
import type { BrandMarkSize } from '../BrandMark';
import type { BrandApp } from '../brand.type';
import type { MascotClip } from '../motion/mascot-clip.type';

type MascotName = 'sentri' | 'flint' | 'pelago';

type MascotChoice = MascotName | 'auto';

interface ChosenMascotProps {
  mascot?: MascotChoice;
  brand?: BrandApp;
  animation?: MascotClip;
  playing?: boolean;
  loop?: boolean;
  size?: BrandMarkSize;
  scale?: number;
  title?: string;
  className?: string;
}

type MascotRegistry = Readonly<Record<MascotName, AnimatedMascotBrand>>;

export type { ChosenMascotProps, MascotChoice, MascotName, MascotRegistry };
