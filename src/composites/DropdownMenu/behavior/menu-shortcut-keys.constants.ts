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
  comma: ',',
  period: '.',
  plus: '+',
  minus: '-',
  equal: '=',
  slash: '/',
  backslash: '\\',
  semicolon: ';',
  quote: '\'',
  backquote: '`',
  bracketleft: '[',
  bracketright: ']',
};

const PLATFORM_MOD = 'mod';

const MAC_PLATFORM = /mac|iphone|ipad/i;

const FUNCTION_KEY = /^f([1-9]|1\d|2[0-4])$/i;

const SHORTCUT_JOINER = '+';

export { FUNCTION_KEY, MAC_PLATFORM, PLATFORM_MOD, SHORTCUT_ALIASES, SHORTCUT_JOINER };
