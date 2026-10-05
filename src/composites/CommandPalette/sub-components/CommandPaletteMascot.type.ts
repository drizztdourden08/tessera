/* @layer renderer-components @kind types */
import type { AnimatedMascotChoice } from '../../../brand/AnimatedMascot';

interface CommandPaletteMascotProps {
  mascot: AnimatedMascotChoice;
  query: string;
  count: number;
  title: string;
}

export type { CommandPaletteMascotProps };
