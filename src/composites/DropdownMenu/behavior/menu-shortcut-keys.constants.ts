/* @layer renderer-components @kind data */
import type { ShortcutKey } from '../../../primitives/Shortcut';

const SHORTCUT_ALIASES: Readonly<Partial<Record<string, ShortcutKey>>> = {
  control: 'ctrl',
  cmdorctrl: 'ctrl',
  commandorcontrol: 'ctrl',
  command: 'cmd',
  meta: 'cmd',
  super: 'win',
  escape: 'esc',
  return: 'enter',
  del: 'delete',
  pgup: 'pageup',
  pgdn: 'pagedown',
};

const SHORTCUT_JOINER = '+';

export { SHORTCUT_ALIASES, SHORTCUT_JOINER };
