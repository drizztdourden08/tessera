/* @layer stories @kind data */
type RandomizerOption = { id: string; label: string; hint: string; choices: readonly string[]; fallback: string };

type RandomizerTab = { id: string; label: string; options: readonly RandomizerOption[] };

const ON_OFF = ['On', 'Off'] as const;

const option = (id: string, label: string, hint: string, choices: readonly string[]): RandomizerOption => ({
  id, label, hint, choices, fallback: choices[0] ?? '',
});

const RANDOMIZER_TABS: readonly RandomizerTab[] = [
  {
    id: 'items',
    label: 'Items',
    options: [
      option('placement', 'Item placement', 'Advanced places items behind tricks a new player may not know.', ['Basic', 'Advanced']),
      option('pool', 'Item pool', 'Hard and Expert remove upgrades and extra hearts.', ['Normal', 'Hard', 'Expert']),
      option('behaviour', 'Item behaviour', 'How strong potions, the cape and the byrna are.', ['Normal', 'Hard', 'Expert']),
      option('weapons', 'Weapons', 'Assured starts you with a sword.', ['Randomized', 'Assured', 'Vanilla', 'Swordless']),
      option('progressive', 'Progressive items', 'Swords, shields, mail and gloves upgrade in order.', ON_OFF),
      option('bottles', 'Bottle contents', 'What a bottle holds when you find it.', ['Random', 'Empty']),
      option('accessibility', 'Accessibility', 'Locations makes every check reachable.', ['Items', 'Locations', 'Beatable']),
      option('heartPieces', 'Heart pieces', 'Shuffle the 24 pieces with the rest of the pool.', ON_OFF),
    ],
  },
  {
    id: 'dungeons',
    label: 'Dungeons',
    options: [
      option('dungeonItems', 'Dungeon items', 'Keysanity shuffles every key, map and compass into the world.', ['Standard', 'Maps and compasses', 'Small keys', 'Keysanity']),
      option('bosses', 'Boss shuffle', 'Full moves every boss, Random allows repeats.', ['None', 'Simple', 'Full', 'Random']),
      option('enemies', 'Enemy shuffle', 'Swaps enemies inside each room.', ['None', 'Shuffled', 'Random']),
      option('pots', 'Pot shuffle', 'Moves what hides under the pots.', ['Off', 'On']),
      option('counters', 'Item counters', 'Shows how many checks a dungeon still holds.', ['Default', 'On', 'Off']),
      option('bigKeys', 'Big key chests', 'Lets a big key chest hold any item.', ['Off', 'On']),
    ],
  },
  {
    id: 'logic',
    label: 'Logic',
    options: [
      option('glitches', 'Glitches required', 'Overworld glitches expects fake flippers and clips.', ['None', 'Overworld glitches', 'Major glitches', 'No logic']),
      option('world', 'World state', 'Open skips the escape, Inverted starts in the Dark World.', ['Standard', 'Open', 'Inverted', 'Retro']),
      option('entrances', 'Entrance shuffle', 'Crossed mixes Light and Dark World doors.', ['None', 'Simple', 'Restricted', 'Full', 'Crossed']),
      option('darkRooms', 'Dark rooms', 'What logic expects you to carry through a dark room.', ['Lamp', 'Torches', 'None']),
      option('hints', 'Hints', 'Telepathic tiles point at useful items.', ON_OFF),
      option('spoiler', 'Spoiler log', 'Writes where every item went next to the seed.', ON_OFF),
      option('timer', 'Timer', 'Counts up, or down to a game over.', ['None', 'Stopwatch', 'Countdown']),
    ],
  },
  {
    id: 'goal',
    label: 'Goal',
    options: [
      option('goal', 'Goal', 'What ends the run.', ['Defeat Ganon', 'Fast Ganon', 'All dungeons', 'Triforce hunt', 'Pedestal']),
      option('towerCrystals', 'Tower crystals', 'Crystals needed to open Ganon\'s Tower.', ['7', '6', '5', '4', '3', '2', '1', '0']),
      option('ganonCrystals', 'Ganon crystals', 'Crystals needed before Ganon can be hurt.', ['7', '6', '5', '4', '3', '2', '1', '0']),
      option('pieces', 'Triforce pieces', 'Pieces placed for a Triforce hunt.', ['30 placed, 20 needed', '40 placed, 30 needed', '20 placed, 20 needed']),
    ],
  },
  {
    id: 'shops',
    label: 'Shops',
    options: [
      option('shopsanity', 'Shopsanity', 'Shop items join the pool.', ['Off', 'On']),
      option('takeAny', 'Take any caves', 'Caves that trade a heart for an item.', ['Off', 'On']),
      option('prices', 'Prices', 'How much shop items cost.', ['Vanilla', 'Cheap', 'Expensive']),
      option('retroBow', 'Retro bow', 'Arrows cost rupees, as in the first game.', ['Off', 'On']),
    ],
  },
  {
    id: 'cosmetics',
    label: 'Cosmetics',
    options: [
      option('sprite', 'Player sprite', 'Who you play as.', ['Link', 'Zelda', 'Tunic', 'Random']),
      option('heartColor', 'Heart colour', 'Colour of the life meter.', ['Red', 'Blue', 'Green', 'Yellow']),
      option('heartBeep', 'Low health beep', 'How often the beep plays.', ['Normal', 'Half', 'Quarter', 'Off']),
      option('menuSpeed', 'Menu speed', 'How fast the item menu opens.', ['Normal', 'Fast', 'Instant']),
      option('music', 'Music', 'Turn it off to stream your own.', ON_OFF),
      option('palette', 'Palette shuffle', 'Recolours the overworld and dungeons.', ['Off', 'Blackout', 'Shuffled']),
    ],
  },
];

const valueOf = (options: Readonly<Record<string, string>>, item: RandomizerOption): string => options[item.id] ?? item.fallback;

const changedIn = (tab: RandomizerTab, options: Readonly<Record<string, string>>): number =>
  tab.options.filter((item) => valueOf(options, item) !== item.fallback).length;

const changedTotal = (options: Readonly<Record<string, string>>): number =>
  RANDOMIZER_TABS.reduce((sum, tab) => sum + changedIn(tab, options), 0);

export type { RandomizerOption };
export { changedIn, changedTotal, RANDOMIZER_TABS, valueOf };
