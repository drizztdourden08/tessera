/* @layer stories @kind data */
import type { LogKindDef } from '../../../src/composites';
import type { QuickCommand } from './ConsoleDemo.type';

const CONSOLE_KINDS: readonly LogKindDef[] = [
  { id: 'sent', label: 'Sent', tone: 'primary', toneMessage: true },
  { id: 'reply', label: 'Reply' },
  { id: 'error', label: 'Error', tone: 'danger', toneMessage: true },
];

const CONSOLE_HISTORY: readonly string[] = ['/players', '/hint Ana Timespinner Wheel', '/save'];

const CONSOLE_REPLIES: Readonly<Record<string, string>> = {
  '/players': 'Team #1: Ana (Timespinner) playing, Bram (A Link to the Past) playing',
  '/save': 'Saved to AP_48213907715260934413.apsave',
};

const QUICK_COMMANDS: readonly QuickCommand[] = [{ label: 'Save', command: '/save' }, { label: 'Players', command: '/players' }];

export { CONSOLE_HISTORY, CONSOLE_KINDS, CONSOLE_REPLIES, QUICK_COMMANDS };
