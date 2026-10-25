/* @layer stories @kind data */
import type { ItemCardProps } from '../../../src/composites';
import { Icon, Tag, Tooltip } from '../../../src/primitives';

const noop = (): void => undefined;

const ROW_ACTIONS: ItemCardProps['actions'] = [
  { id: 'install', label: 'Install', icon: 'download', kind: 'primary', onSelect: noop },
  { id: 'page', label: 'Open the page', icon: 'external-link', onSelect: noop },
  { id: 'remove', label: 'Remove', icon: 'trash-2', kind: 'danger', onSelect: noop },
];

const COMPACT_ROWS: readonly ItemCardProps[] = [
  {
    title: 'Timespinner', media: <Icon name="gamepad-2" size={20} />, status: { label: 'update', tone: 'warning' },
    details: ['World 1.2.0'], actions: ROW_ACTIONS,
  },
  {
    title: 'The Grinch', media: <Icon name="puzzle" size={20} />, mediaTone: 'info', status: { label: 'stable', tone: 'info' },
    details: ['World 1.5.8'], actions: ROW_ACTIONS,
  },
  {
    title: 'Hollow Knight', media: <Icon name="gamepad-2" size={20} />, mediaTone: 'warning', status: { label: 'installed', tone: 'success' },
    details: ['World 0.6.7'], actions: ROW_ACTIONS, selected: true,
  },
  {
    title: 'Hyrule Symphony', media: <Icon name="music" size={20} />, mediaTone: 'neutral', status: { label: 'stable', tone: 'info' },
    details: ['Music pack 2.0.1'], actions: ROW_ACTIONS,
  },
  {
    title: 'Pixel Frame Toolkit With A Very Long Name That Ends In An Ellipsis', media: <Icon name="package" size={20} />, mediaTone: 'success',
    status: { label: 'installed', tone: 'success' }, details: ['Version 3.4.0'], actions: ROW_ACTIONS,
  },
];

const OWN_DIALOG_ACTIONS: ItemCardProps['actions'] = [
  { id: 'install', label: 'Install', icon: 'download', kind: 'primary', loading: true, nameSuffix: 'Timespinner', onSelect: noop },
  { id: 'remove', label: 'Remove', icon: 'trash-2', kind: 'danger', confirm: false, nameSuffix: 'Timespinner', onSelect: noop },
];

const TAG_ROWS: readonly ItemCardProps[] = [
  {
    title: 'Timespinner', media: <Icon name="gamepad-2" size={20} />, mediaLabel: 'Game', mediaTone: 'tertiary',
    details: [<Tooltip key="status" content="Updated on Friday" focusable>update ready</Tooltip>, 'World 1.2.0'],
    tags: [<Tag key="genre" variant="category" color="violet">Metroidvania</Tag>, <Tag key="mode" color="primary">Co-op</Tag>],
    actions: OWN_DIALOG_ACTIONS,
  },
  {
    title: 'The Grinch', media: <Icon name="puzzle" size={20} />, mediaLabel: 'Mod', details: ['World 1.5.8'],
    tags: ['Puzzle', 'Platformer', 'Randomizer', 'Co-op', 'Hard', 'Short'].map((name) => <Tag key={name}>{name}</Tag>), actions: ROW_ACTIONS,
  },
  {
    title: 'Hollow Knight', media: <Icon name="gamepad-2" size={20} />, mediaLabel: 'Game', mediaTone: 'tertiary',
    details: [<Tooltip key="status" content="Updated on Friday, with a long list of fixes" focusable>update ready with a very long note about the changes</Tooltip>, 'World 1.2.0'],
    actions: ROW_ACTIONS,
  },
];

export { COMPACT_ROWS, TAG_ROWS };
