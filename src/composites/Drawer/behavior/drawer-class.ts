/* @layer renderer-components @kind util */
import type { DrawerProps } from '../Drawer.type';

const drawerClass = (side: NonNullable<DrawerProps['side']>, size: DrawerProps['size'], open: boolean, look?: DrawerProps['look']): string =>
  ['drawer', `drawer--${side}`, size && size !== 'md' ? `drawer--${size}` : '', look === 'split' ? 'drawer--split' : '', open ? 'drawer--open' : ''].filter(Boolean).join(' ');

export { drawerClass };
