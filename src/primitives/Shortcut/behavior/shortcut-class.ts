/* @layer renderer-components @kind util */
import type { ShortcutClassParams } from '../Shortcut.type';

const shortcutClass = (params: ShortcutClassParams): string => {
  const { animate, state, fill, className } = params;
  const parts = [
    'shortcut',
    animate ? 'shortcut--animate' : '',
    state ? `shortcut--${state}` : '',
    fill ? 'shortcut--fill' : '',
    className ?? '',
  ];
  return parts.filter(Boolean).join(' ');
};

export { shortcutClass };
