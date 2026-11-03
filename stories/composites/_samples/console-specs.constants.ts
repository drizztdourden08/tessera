/* @layer stories @kind data */
import type { CommandSpec, PatternChoice, PatternSetup } from '../../../src/composites';

const PLAYER_NAMES: readonly string[] = ['Ana', 'Bram', 'Cleo'];

const PLAYER_ITEMS: Readonly<Record<string, readonly string[]>> = {
  Ana: ['Timespinner Wheel', 'Lightwall', 'Cyber Pistol'],
  Bram: ['Moon Pearl', 'Hookshot', 'Master Sword'],
  Cleo: ['Hearthstone', 'Iron Boots'],
};

const choicesOf = (values: readonly string[]): readonly PatternChoice[] => values.map((value) => ({ value }));

const PLAYER_SETUP: PatternSetup = { lists: { players: choicesOf(PLAYER_NAMES) } };

const HINT_SETUP: PatternSetup = {
  lists: {
    players: choicesOf(PLAYER_NAMES),
    items: (value) => choicesOf(PLAYER_ITEMS[String(value.player)] ?? []),
  },
};

const CONSOLE_SPECS: readonly CommandSpec[] = [
  {
    id: 'hint', label: 'Hint', icon: 'flag', group: 'Items', description: 'Ask where an item is',
    pattern: '/hint {player:choice @players "Player"} {item:choice @items "Item"}',
    setup: HINT_SETUP,
  },
  {
    id: 'find', label: 'Find item', icon: 'search', group: 'Items', description: 'List where one item of a player lies',
    params: [
      { name: 'player', label: 'Player', kind: 'choice', options: PLAYER_NAMES, placeholder: 'Pick a player' },
      {
        name: 'item', label: 'Item', kind: 'choice', dependsOn: 'player', placeholder: 'Pick an item',
        options: (values) => PLAYER_ITEMS[String(values.player)] ?? [],
      },
      { name: 'note', label: 'Note', kind: 'text', optional: true, placeholder: 'Why you need it' },
    ],
    format: (values) => `/hint ${String(values.player)} ${String(values.item)}`,
  },
  {
    id: 'release', label: 'Release', icon: 'users', group: 'Items', description: 'Send every item a player still holds',
    pattern: '/release {player:choice @players "Player"}',
    setup: PLAYER_SETUP,
  },
  {
    id: 'countdown', label: 'Countdown', icon: 'hash', group: 'Room', description: 'Count down before the room starts',
    pattern: '/countdown {seconds:number 1..60 "Seconds"}',
  },
  {
    id: 'save', label: 'Save', icon: 'save', group: 'Room', description: 'Write the room to its save file',
    pattern: '/save {name:text max32 alnum "File name"}',
  },
];

export { CONSOLE_SPECS };
