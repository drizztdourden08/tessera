/* @layer stories @kind data */
import type { CommandEntry, LogKindDef } from '../../../src/composites';
import type { QuickCommand } from './ConsoleDemo.type';

const CONSOLE_KINDS: readonly LogKindDef[] = [
  { id: 'sent', label: 'Sent', tone: 'primary', toneMessage: true },
  { id: 'reply', label: 'Reply' },
  { id: 'error', label: 'Error', tone: 'danger', toneMessage: true },
];

const CONSOLE_HISTORY: readonly string[] = ['/players', '/hint Ana Timespinner Wheel', '/save'];

const CONSOLE_COMMANDS: readonly CommandEntry[] = [
  { command: '/players', description: 'Who is in the room and what they play' },
  { command: '/hint', description: 'Ask where an item is' },
  { command: '/save', description: 'Write the room to its save file' },
  { command: '/status', description: 'How far each player has come' },
  { command: '/release', description: 'Send every item a player still holds' },
  { command: '/collect', description: 'Take back every item a player is owed' },
  { command: '/countdown', description: 'Count down before the room starts' },
  { command: '/exit', description: 'Close the room' },
];

const CONSOLE_REPLIES: Readonly<Record<string, string>> = {
  '/players': 'Team #1: Ana (Timespinner) playing, Bram (A Link to the Past) playing',
  '/save': 'Saved to AP_48213907715260934413.apsave',
};

const QUICK_COMMANDS: readonly QuickCommand[] = [{ label: 'Save', command: '/save' }, { label: 'Players', command: '/players' }];

export { CONSOLE_COMMANDS, CONSOLE_HISTORY, CONSOLE_KINDS, CONSOLE_REPLIES, QUICK_COMMANDS };
