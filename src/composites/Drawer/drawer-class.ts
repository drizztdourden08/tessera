/* @layer renderer-components @kind util */
import type { DrawerProps } from './Drawer.type';

const drawerClass = (side: NonNullable<DrawerProps['side']>, size: DrawerProps['size'], open: boolean): string =>
  ['drawer', `drawer--${side}`, size && size !== 'md' ? `drawer--${size}` : '', open ? 'drawer--open' : ''].filter(Boolean).join(' ');

export { drawerClass };
