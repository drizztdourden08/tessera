/* @layer renderer-components @kind types */
import type { MascotChoice } from '../../../brand/ChosenMascot';

interface CommandPaletteMascotProps {
  mascot: MascotChoice;
  query: string;
  count: number;
  title: string;
}

export type { CommandPaletteMascotProps };
