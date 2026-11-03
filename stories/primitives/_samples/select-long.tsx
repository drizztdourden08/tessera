/* @layer stories @kind component */
import { useState } from 'react';
import { Select } from '../../../src/primitives';
import type { SelectGroup, SelectOption } from '../../../src/primitives';
import { ValueReadout } from '../../_template/ValueReadout';

const ADJECTIVES = ['Golden', 'Silver', 'Broken', 'Ancient', 'Tiny', 'Heavy', 'Hidden', 'Cursed', 'Royal', 'Lucky'];

const NOUNS = [
  'Sword', 'Shield', 'Bow', 'Arrow', 'Bomb', 'Boomerang', 'Hookshot', 'Lantern', 'Hammer', 'Flute', 'Mirror', 'Cape', 'Boots',
  'Gloves', 'Flippers', 'Medallion', 'Rod', 'Staff', 'Bottle', 'Key', 'Map', 'Compass', 'Heart', 'Rupee', 'Crystal',
];

const KINDS = ['Weapons', 'Tools', 'Keys', 'Treasures', 'Upgrades'];

const COUNT = 5000;

const itemName = (at: number): string => {
  const adjective = ADJECTIVES[at % ADJECTIVES.length] ?? '';
  const noun = NOUNS[Math.floor(at / ADJECTIVES.length) % NOUNS.length] ?? '';
  return `${adjective} ${noun} ${Math.floor(at / (ADJECTIVES.length * NOUNS.length)) + 1}`;
};

const LONG_OPTIONS: readonly SelectOption[] = Array.from({ length: COUNT }, (_, at) => ({ value: `item-${at}`, label: itemName(at) }));

const LONG_GROUPS: readonly SelectGroup[] = KINDS.map((label, kind) => ({
  label,
  options: LONG_OPTIONS.filter((_, at) => at % KINDS.length === kind),
}));

const LongList = () => {
  const [item, setItem] = useState('item-4321');
  return (
    <ValueReadout value={item}>
      <Select options={LONG_OPTIONS} searchable value={item} onChange={setItem} placeholder="Pick an item" />
    </ValueReadout>
  );
};

const LongGroups = () => {
  const [items, setItems] = useState<string[]>(['item-12', 'item-3999']);
  return (
    <ValueReadout value={items}>
      <Select groups={LONG_GROUPS} max={5} values={items} onValuesChange={setItems} placeholder="Pick up to five items" />
    </ValueReadout>
  );
};

export { LongGroups, LongList };
