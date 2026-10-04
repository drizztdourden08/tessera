/* @layer stories @kind data */
const ITEMS: readonly string[] = [
  'Progressive Sword', 'Progressive Glove', 'Bombs (10)', 'Arrows (10)', 'Moon Pearl', 'Hookshot', 'Pegasus Boots', 'Magic Mirror',
  'Flippers', 'Lamp', 'Fire Rod', 'Ice Rod', 'Hammer', 'Bug Catching Net', 'Book of Mudora', 'Cane of Somaria', 'Cape', 'Bottle',
];

const PLANDO = { uncle_leaving_text: 'Have fun, Bram', ganon_phase_3_alt: 'Got wax in your ears?' };

const BROKEN = `{
  "uncle_leaving_text": "Have fun, Bram"
  "ganon_phase_3_alt": "Got wax in your ears?"
}`;

const BROKEN_CASES: Readonly<Record<string, string>> = {
  'a missing comma': BROKEN,
  'a comma before the end': '{\n  "a": 1,\n}',
  'a text with no closing quote': '{\n  "uncle_leaving_text": "Have fun\n}',
  'a list where an object goes': '["Moon Pearl", "Hookshot"]',
};

const START_INVENTORY: Readonly<Record<string, number>> = { 'Progressive Sword': 1, 'Bombs (10)': 2, 'Pegasus Boots': 1 };

const BALANCING = [{ label: 'Disabled', value: 0 }, { label: 'Normal', value: 50 }, { label: 'Extreme', value: 99 }] as const;

const HINTED: readonly string[] = ['Moon Pearl', 'Hookshot'];

export { BALANCING, BROKEN, BROKEN_CASES, HINTED, ITEMS, PLANDO, START_INVENTORY };
