/* @layer renderer-components @kind util */
import type { MenuFocusStart } from './menu-context.type';

const menuStart = (inline: boolean, focusOnOpen: boolean | undefined): MenuFocusStart =>
  (inline || focusOnOpen === false ? 'none' : 'first');

export { menuStart };
