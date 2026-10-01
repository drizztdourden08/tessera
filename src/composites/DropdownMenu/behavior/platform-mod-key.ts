/* @layer renderer-components @kind util */
import { MAC_PLATFORM } from './menu-shortcut-keys.constants';
import type { ShortcutKey } from '../../../primitives/Shortcut';

const platformModKey = (): ShortcutKey => {
  if (typeof navigator === 'undefined') return 'ctrl';
  return MAC_PLATFORM.test(navigator.platform || navigator.userAgent) ? 'cmd' : 'ctrl';
};

export { platformModKey };
