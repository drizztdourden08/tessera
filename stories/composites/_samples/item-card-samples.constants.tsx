/* @layer stories @kind data */
import type { ItemCardProps } from '../../../src/composites';
import { Icon, Tag } from '../../../src/primitives';

const noop = (): void => undefined;

const STORE_CARDS: readonly ItemCardProps[] = [
  {
    title: 'Timespinner', eyebrow: 'Official', status: { label: 'update', tone: 'warning' },
    media: <Icon name="gamepad-2" size={40} />,
    tags: [<Tag key="genre" variant="category" color="violet">Metroidvania</Tag>, <Tag key="pc">PC</Tag>],
    details: ['World 1.2.0', 'For AP 0.6.7', 'Installed 1.1.4'],
    actions: [
      { id: 'update', label: 'Update', icon: 'download', kind: 'primary', onSelect: noop },
      { id: 'preset', label: 'Make a preset', onSelect: noop },
      { id: 'remove', label: 'Remove', icon: 'trash-2', kind: 'danger', onSelect: noop },
    ],
  },
  {
    title: 'The Grinch', eyebrow: 'Community', status: { label: 'stable', tone: 'info' },
    media: <Icon name="puzzle" size={40} />, mediaTone: 'info',
    tags: [<Tag key="genre" variant="category" color="green">Platformer</Tag>, <Tag key="pc">PC (Steam)</Tag>],
    details: ['World 1.5.8', 'Tracker available', 'Needs the Grinch-AP client from the world page'],
    actions: [
      { id: 'install', label: 'Install', icon: 'download', kind: 'primary', onSelect: noop },
      { id: 'page', label: 'World page', icon: 'external-link', onSelect: noop },
    ],
  },
  {
    title: 'Hollow Knight', eyebrow: 'Official', status: { label: 'installed', tone: 'success' }, selected: true,
    media: <Icon name="gamepad-2" size={40} />, mediaTone: 'warning',
    tags: [<Tag key="genre" variant="category" color="violet">Metroidvania</Tag>],
    details: ['World 0.6.7', 'For AP 0.6.7', '3 presets'],
    actions: [
      { id: 'preset', label: 'Make a preset', icon: 'plus', kind: 'primary', onSelect: noop },
      { id: 'remove', label: 'Remove', icon: 'trash-2', kind: 'danger', onSelect: noop },
    ],
  },
];

const DATA_CARDS: readonly ItemCardProps[] = [
  {
    title: 'Session runs', eyebrow: 'Data', layout: 'left', media: <Icon name="history" size={28} />, mediaTone: 'danger',
    details: ['14 runs', '1.6 GB', 'oldest 3 months ago'],
    actions: [
      { id: 'clean', label: 'Clean old runs', onSelect: noop },
      { id: 'folder', label: 'Open folder', icon: 'folder-open', onSelect: noop },
    ],
  },
  {
    title: 'Engine', eyebrow: 'Data', layout: 'left', status: { label: 'ready', tone: 'success' }, media: <Icon name="cpu" size={28} />, mediaTone: 'neutral',
    details: ['Archipelago 0.6.7', '288 MB'],
    actions: [
      { id: 'folder', label: 'Open folder', icon: 'folder-open', onSelect: noop },
      { id: 'rebuild', label: 'Rebuild', kind: 'danger', onSelect: noop },
    ],
  },
];

export { DATA_CARDS, STORE_CARDS };
