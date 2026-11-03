/* @layer stories @kind data */
import type { CommandEntry, CommandSpec, LogKindDef } from '../../../src/composites';
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

const PLAYER_NAMES: readonly string[] = ['Ana', 'Bram', 'Cleo'];

const CONSOLE_SPECS: readonly CommandSpec[] = [
  {
    id: 'hint', label: 'Hint', icon: 'flag', group: 'Items', description: 'Ask where an item is',
    params: [{ name: 'player', label: 'Player', kind: 'choice', options: PLAYER_NAMES }, { name: 'item', label: 'Item', kind: 'text' }],
    format: (values) => `/hint ${String(values.player)} ${String(values.item)}`,
  },
  {
    id: 'release', label: 'Release', icon: 'users', group: 'Items', description: 'Send every item a player still holds',
    params: [{ name: 'player', label: 'Player', kind: 'choice', options: PLAYER_NAMES }, { name: 'force', label: 'Force', kind: 'boolean' }],
    format: (values) => (values.force === true ? `/release ${String(values.player)} force` : `/release ${String(values.player)}`),
  },
  {
    id: 'countdown', label: 'Countdown', icon: 'hash', group: 'Room', description: 'Count down before the room starts',
    params: [{ name: 'seconds', label: 'Seconds', kind: 'number' }],
    format: (values) => `/countdown ${String(values.seconds)}`,
  },
  {
    id: 'save', label: 'Save', icon: 'save', group: 'Room', description: 'Write the room to its save file',
    params: [{ name: 'name', label: 'File name', kind: 'text', optional: true }],
    format: (values) => (values.name === undefined || values.name === '' ? '/save' : `/save ${String(values.name)}`),
  },
];

const CONSOLE_REPLIES: Readonly<Record<string, string>> = {
  '/players': 'Team #1: Ana (Timespinner) playing, Bram (A Link to the Past) playing',
  '/save': 'Saved to AP_48213907715260934413.apsave',
  '/hint': 'The item is in the world of Bram, at the Pyramid chest.',
  '/release': 'Released every item the player still held.',
  '/countdown': 'The room starts when the count ends.',
};

const QUICK_COMMANDS: readonly QuickCommand[] = [{ label: 'Save', command: '/save' }, { label: 'Players', command: '/players' }];

export { CONSOLE_COMMANDS, CONSOLE_HISTORY, CONSOLE_KINDS, CONSOLE_REPLIES, CONSOLE_SPECS, QUICK_COMMANDS };
