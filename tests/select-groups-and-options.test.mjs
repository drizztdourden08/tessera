/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { allOptionsOf } from '../src/primitives/Select/behavior/all-options';
import { optionsSetup } from '../src/primitives/Select/behavior/options-setup';
import { buildRows } from '../src/primitives/listbox/build-rows';

const LOOSE = [{ value: 'none', label: 'None' }];
const GROUPS = [
  { label: 'Warm', options: [{ value: 'red', label: 'Red' }] },
  { label: 'Cool', options: [{ value: 'blue', label: 'Blue' }] },
];

describe('Select with options and groups together', () => {
  it('lists the options first, then the options of each group', () => {
    expect(allOptionsOf(GROUPS, LOOSE).map((option) => option.value)).toEqual(['none', 'red', 'blue']);
  });

  it('keeps the options alone when there are no groups, and the groups alone when there are no options', () => {
    expect(allOptionsOf(undefined, LOOSE)).toEqual(LOOSE);
    expect(allOptionsOf(GROUPS, undefined).map((option) => option.value)).toEqual(['red', 'blue']);
  });

  it('draws the options in an unlabelled block before the labelled groups', () => {
    const setup = optionsSetup({ options: LOOSE, groups: GROUPS }, 'No options');
    const { blocks } = buildRows(setup.items, setup);
    expect(blocks.map((block) => block.label)).toEqual([undefined, 'Warm', 'Cool']);
    expect(blocks[0].entries.map((entry) => entry.label)).toEqual(['None']);
  });
});
