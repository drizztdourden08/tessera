/* @layer stories @kind data */
import type { ScaleLabelEntry } from '../../../src/primitives';

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
};

const START_INVENTORY: Readonly<Record<string, number>> = { 'Progressive Sword': 1, 'Bombs (10)': 2, 'Pegasus Boots': 1 };

const BALANCING: readonly ScaleLabelEntry[] = [[0, 'Disabled'], [50, 'Normal'], [99, 'Extreme']];

const HINTED: readonly string[] = ['Moon Pearl', 'Hookshot'];

export { BALANCING, BROKEN, BROKEN_CASES, HINTED, ITEMS, PLANDO, START_INVENTORY };
