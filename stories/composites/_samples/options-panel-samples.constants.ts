/* @layer stories @kind constants */
import type { TabItem } from '../../../src/primitives';
import type { SampleGroup, SampleOption } from './options-panel-samples.type';

const SAMPLE_TABS: TabItem[] = [
  { id: 'items', label: 'Items', badge: 4 },
  { id: 'world', label: 'World', badge: 3 },
];

const SAMPLE_GROUPS: Readonly<Record<string, readonly SampleGroup[]>> = {
  items: [
    {
      title: 'Pool',
      tone: 'default',
      options: [
        { id: 'shuffle', label: 'Shuffle items', description: 'Mix the items between the chests of the game.', on: true, aside: '+4 items' },
        { id: 'bombs', label: 'Extra bombs', description: 'Add bomb refills to the pool.', tag: 'Hard', on: false, aside: '+12 items' },
        { id: 'keys', label: 'Small keys', description: 'Keys are kept in their own dungeon.', locked: true, tag: 'Locked', on: true, aside: 'No change' },
      ],
    },
    {
      title: 'During a run',
      tone: 'live',
      options: [
        { id: 'hints', label: 'Show hints', description: 'Hint signs name the place of a chosen item.', on: true, aside: 'No change' },
      ],
    },
  ],
  world: [
    {
      title: 'Layout',
      tone: 'default',
      options: [
        { id: 'doors', label: 'Shuffle doors', description: 'Mix the doors between rooms.', forced: true, note: 'Turned on by the Open mode.', on: true, aside: 'No change' },
        { id: 'mode', label: 'Mode', description: 'Chosen by the preset and read only here.', readOnly: true, on: true, aside: 'No change' },
      ],
    },
    {
      title: 'During a run',
      tone: 'live',
      options: [
        { id: 'pace', label: 'Fast travel', description: 'Open the warp map from the start.', on: false, aside: 'No change' },
      ],
    },
  ],
};

const SAMPLE_VALUES: Readonly<Record<string, boolean>> = Object.fromEntries(
  Object.values(SAMPLE_GROUPS).flatMap((groups) => groups.flatMap((group) => group.options)).map((option: SampleOption) => [option.id, option.on]),
);

export { SAMPLE_GROUPS, SAMPLE_TABS, SAMPLE_VALUES };
