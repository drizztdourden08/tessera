/* @layer stories @kind data */
type RandomizerOption = { id: string; label: string; hint: string; choices: readonly string[]; fallback: string };

type RandomizerTab = { id: string; label: string; live: boolean; options: readonly RandomizerOption[] };

type OptionMore = { fallback?: string; hint?: string };

const option = (id: string, label: string, choices: readonly string[], more: OptionMore = {}): RandomizerOption => ({
  id, label, hint: more.hint ?? '', choices, fallback: more.fallback ?? choices[0] ?? '',
});

const toggle = (id: string, label: string, on: boolean, hint = ''): RandomizerOption => option(id, label, ['On', 'Off'], { fallback: on ? 'On' : 'Off', hint });

const DUNGEON_ITEM = ['Original Dungeon', 'Own Dungeons', 'Own World', 'Any World', 'Different World', 'Start With'];
const CRYSTALS = ['7', '6', '5', '4', '3', '2', '1', '0'];
const CURVES = ['Equal', 'Front-loaded', 'Ramp', 'Reverse Fibonacci', 'Halves', 'Free sequence'];
const POND = ['Vanilla grants', 'Vanilla cost', 'Custom'];

const RANDOMIZER_TABS: readonly RandomizerTab[] = [
  { id: 'world', label: 'World', live: true, options: [
    toggle('npcChecks', 'Include NPC and event checks', true, 'Rewards from characters, bosses and story events join the shuffle.'),
    toggle('standing', 'Include standing world items', true),
    option('accessibility', 'Accessibility', ['Full', 'Items', 'Minimal'], { hint: 'Full: every location can be reached.' }),
    toggle('darkRooms', 'Dark rooms need a light', true),
    toggle('lamp', 'Lamp lights a dark room', true),
    toggle('fireRod', 'Fire rod lights a dark room', true),
    toggle('bombos', 'Bombos lights a dark room', true),
    toggle('redCane', 'Red cane lights a dark room', true),
  ] },
  { id: 'goal', label: 'Goal', live: false, options: [
    option('goal', 'Goal', ['Ganon', 'Crystals', 'Bosses', 'Pedestal', 'Ganon Pedestal', 'Triforce Hunt', 'Local Triforce Hunt', 'Ganon Triforce Hunt'], { hint: 'What ends the seed and what it asks of you first.' }),
    option('towerCrystals', 'Crystals to enter the dark tower', CRYSTALS),
    option('ganonCrystals', 'Crystals to hurt the final boss', CRYSTALS),
    option('piecesRequired', 'Triforce Pieces Required', ['20', '30', '40']),
    option('piecesAvailable', 'Triforce Pieces Available', ['30', '40', '50']),
  ] },
  { id: 'items', label: 'Items', live: true, options: [
    option('swordOrder', 'Sword: how the tiers arrive', ['In order', 'Any order']),
    option('shieldOrder', 'Shield: how the tiers arrive', ['In order', 'Any order']),
    option('swordCopies', 'Sword: copies', ['Normal', 'Double', 'Triple']),
    option('hearts', 'Most hearts', ['20', '16', '12', '8', '3']),
    toggle('retroBow', 'Retro Bow', false, 'Arrows are no longer found or carried; every shot costs rupees.'),
    toggle('net', 'Net catches fairies', true),
    toggle('cape', 'Cape drains magic twice as fast', false),
    toggle('silvers', 'Silver arrows bite everywhere', true),
    toggle('hammerGanon', 'Hammer hurts the last fight', false),
    toggle('medallions', 'Medallion doors need no sword', false),
  ] },
  { id: 'shops', label: 'Shops', live: true, options: [
    option('shopShuffle', 'Shop Shuffle', ['Custom (exactly the ticked slots)', 'Vanilla (nothing shuffled)', 'Sequential (the first ticked slots)', 'Random (ticked slots drawn from the seed)']),
    option('slots', 'Available Shop Slots', ['0', '4', '8', '12']),
    option('perSlot', 'Items Per Shop Slot', ['2', '1', '3']),
    option('priceModifier', 'Shop Price Modifier', ['100%', '50%', '150%', '200%']),
  ] },
  { id: 'dungeon', label: 'Dungeon', live: true, options: [
    toggle('prizes', 'Shuffle Dungeon Prizes', true, 'Pendants and crystals move between dungeons.'),
    option('bigKeys', 'Big Key Shuffle', DUNGEON_ITEM),
    option('smallKeys', 'Small Key Shuffle', [...DUNGEON_ITEM, 'Universal']),
    toggle('keyDrops', 'Key Drop Shuffle', true),
    option('compasses', 'Compass Shuffle', DUNGEON_ITEM),
    option('maps', 'Map Shuffle', DUNGEON_ITEM),
  ] },
  { id: 'capacity', label: 'Capacity upgrades', live: true, options: [
    toggle('capacity', 'Capacity upgrades', true),
    toggle('progressiveCapacity', 'Progressive capacity upgrades', true),
    option('explosives', 'Explosives upgrades', ['Vanilla', 'Vanilla in pool', 'Custom']),
    option('explosivesCurve', 'Explosives upgrade curve', CURVES),
    option('wallet', 'Wallet upgrades', ['Vanilla', 'Custom']),
  ] },
  { id: 'pond', label: 'Fairy ponds', live: true, options: [
    toggle('pondShare', 'One set of settings for all three ponds', true),
    option('hylia', 'Hylia Fairy', POND),
    option('waterfall', 'Waterfall Fairy', POND),
    option('pyramid', 'Pyramid Fairy', POND),
  ] },
  { id: 'environmental', label: 'Environmental', live: false, options: [
    option('prizeShuffle', 'Shuffle Prizes', ['Off', 'General', 'Bonk', 'Both']),
    toggle('pots', 'Pot Shuffle', false),
    toggle('bushes', 'Bush Shuffle', false),
  ] },
  { id: 'entrance', label: 'Entrance', live: false, options: [
    option('entrances', 'Entrance Shuffle', ['Vanilla', 'Dungeons Simple', 'Dungeons Full', 'Dungeons Crossed', 'Simple', 'Restricted', 'Full', 'Crossed', 'Insanity'], { hint: 'Where the doorways lead, from dungeon doors alone up to every door in both worlds.' }),
  ] },
  { id: 'enemies', label: 'Enemies', live: false, options: [
    option('enemyHealth', 'Enemy Health', ['Default', 'Easy', 'Hard', 'Expert']),
    option('enemyDamage', 'Enemy Damage', ['Default', 'Shuffled', 'Chaos']),
    option('bossShuffle', 'Boss Shuffle', ['None', 'Basic', 'Full', 'Chaos', 'Singularity']),
    toggle('enemyShuffle', 'Enemy Shuffle', false),
    toggle('thieves', 'Killable Thieves', false),
  ] },
  { id: 'traps', label: 'Traps', live: false, options: [
    option('beeTotal', 'Beemizer Total Chance', ['0', '25', '50', '100']),
    option('beeTrap', 'Beemizer Trap Chance', ['0', '25', '60', '100']),
  ] },
  { id: 'minigames', label: 'Mini-games', live: false, options: [] },
  { id: 'timer', label: 'Timer', live: false, options: [
    option('timer', 'Timer', ['None', 'Timed', 'Timed OHKO', 'OHKO', 'Timed Countdown', 'Display']),
    option('countdown', 'Countdown Start Time', ['0', '60', '120', '240']),
  ] },
  { id: 'glitches', label: 'Glitches', live: false, options: [
    option('glitches', 'Glitches Required', ['No Glitches', 'Minor Glitches', 'Overworld Glitches', 'Hybrid Major Glitches', 'No Logic']),
  ] },
];

const valueOf = (options: Readonly<Record<string, string>>, item: RandomizerOption): string => options[item.id] ?? item.fallback;

const changedIn = (tab: RandomizerTab, options: Readonly<Record<string, string>>): number =>
  tab.options.filter((item) => valueOf(options, item) !== item.fallback).length;

const changedTotal = (options: Readonly<Record<string, string>>): number =>
  RANDOMIZER_TABS.reduce((sum, tab) => sum + changedIn(tab, options), 0);

const changedNames = (options: Readonly<Record<string, string>>): readonly string[] =>
  RANDOMIZER_TABS.flatMap((tab) => tab.options.filter((item) => valueOf(options, item) !== item.fallback).map((item) => `${item.label}: ${valueOf(options, item)}`));

export type { RandomizerOption };
export { changedIn, changedNames, changedTotal, RANDOMIZER_TABS, valueOf };
