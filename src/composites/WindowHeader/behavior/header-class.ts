/* @layer renderer-components @kind util */
import type { WindowHeaderLook } from '../WindowHeader.type';

const headerClass = (titleWrap: boolean | undefined, className: string, look?: WindowHeaderLook, stackNarrow?: boolean): string =>
  ['window-header', titleWrap && 'window-header--wrap', stackNarrow && 'window-header--stack', look && `window-header--${look}`, className, 'window-chrome']
    .filter(Boolean).join(' ');

export { headerClass };
