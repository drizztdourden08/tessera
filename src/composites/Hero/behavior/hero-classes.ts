/* @layer renderer-components @kind logic */
import type { HeroProps } from '../Hero.type';

const heroClasses = ({ art, backdrop, aside, size = 'default', className }: HeroProps): string =>
  [
    'hero',
    aside != null && 'hero--aside',
    art == null && backdrop == null && 'hero--bare',
    size !== 'default' && `hero--${size}`,
    className,
  ].filter(Boolean).join(' ');

export { heroClasses };
