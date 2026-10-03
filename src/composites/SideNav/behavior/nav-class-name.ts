/* @layer renderer-components @kind logic */
import type { SideNavVariant } from '../SideNav.type';

const navClassName = (variant: SideNavVariant, open: boolean, overlay: boolean, className: string): string =>
  ['side-nav', `side-nav--${variant}`, open ? 'side-nav--open' : '', overlay ? 'side-nav--overlay' : '', className]
    .filter(Boolean)
    .join(' ');

export { navClassName };
