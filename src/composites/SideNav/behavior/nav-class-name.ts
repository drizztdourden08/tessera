/* @layer renderer-components @kind logic */
import type { NavClassParams } from './nav-class-name.type';

const navClassName = (params: NavClassParams): string => {
  const { variant, open, overlay, lead, className } = params;
  return ['side-nav', `side-nav--${variant}`, `side-nav--lead-${lead}`, open ? 'side-nav--open' : '', overlay ? 'side-nav--overlay' : '', className]
    .filter(Boolean)
    .join(' ');
};

export { navClassName };
