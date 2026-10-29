/* @layer renderer-components @kind util */
import type { SwatchClassesInput } from './swatch-classes.type';

const swatchClasses = (input: SwatchClassesInput): string => [
  'color-swatch',
  `color-swatch--${input.size}`,
  input.selected ? 'color-swatch--selected' : '',
  input.edited ? 'color-swatch--edited' : '',
  input.transparent ? 'color-swatch--transparent' : '',
  input.translucent ? 'color-swatch--translucent' : '',
  input.unused ? 'color-swatch--unused' : '',
  input.mixed ? 'color-swatch--mixed' : '',
  input.focusRing === 'apart' ? 'color-swatch--ring-apart' : '',
  input.fill ? 'color-swatch--fill' : '',
  input.className,
].filter(Boolean).join(' ');

export { swatchClasses };
