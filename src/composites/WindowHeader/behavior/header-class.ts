/* @layer renderer-components @kind util */
import type { WindowHeaderLook } from '../WindowHeader.type';

const headerClass = (titleWrap: boolean | undefined, className: string, look?: WindowHeaderLook): string =>
  ['window-header', titleWrap && 'window-header--wrap', look && `window-header--${look}`, className, 'window-chrome'].filter(Boolean).join(' ');

export { headerClass };
