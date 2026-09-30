/* @layer renderer-components @kind logic */
import type { SectionNavVariant } from '../SectionNav.type';

const navClassName = (variant: SectionNavVariant, open: boolean, className: string): string =>
  ['section-nav', `section-nav--${variant}`, open ? 'section-nav--open' : '', className].filter(Boolean).join(' ');

export { navClassName };
