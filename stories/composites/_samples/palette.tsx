/* @layer stories @kind data */
import { matchesText } from '../../../src/data';
import { Icon } from '../../../src/primitives';
import type { IconName } from '../../../src/primitives';
import type { CommandPaletteGroup, CommandPaletteItem } from '../../../src/composites';

type PaletteKind = 'screen' | 'setting' | 'action';

interface PaletteEntry extends CommandPaletteItem {
  kind: PaletteKind;
}

type Flags = Readonly<Record<string, boolean>>;

const icon = (name: IconName) => <Icon name={name} size={16} />;

const SCREENS: readonly PaletteEntry[] = [
  { id: 'home', kind: 'screen', label: 'Home', icon: icon('house'), description: 'Profiles and recent sessions' },
  { id: 'tracker', kind: 'screen', label: 'Item tracker', icon: icon('layout-grid'), description: 'What each player has found' },
  { id: 'logs', kind: 'screen', label: 'Logs', icon: icon('file-text'), description: 'Everything the app has said' },
  { id: 'input', kind: 'screen', label: 'Input tester', icon: icon('gamepad-2'), breadcrumb: ['Tools'] },
  { id: 'settings', kind: 'screen', label: 'Settings', icon: icon('settings') },
];

const settings = (flags: Flags, flip: (id: string) => void): readonly PaletteEntry[] => [
  {
    id: 'sound', kind: 'setting', label: 'Play sounds', icon: icon('volume-2'), breadcrumb: ['Settings', 'Audio'],
    toggle: { checked: flags.sound ?? false, onChange: () => flip('sound') },
  },
  {
    id: 'tray', kind: 'setting', label: 'Close to the tray', icon: icon('monitor'), breadcrumb: ['Settings', 'Window'],
    toggle: { checked: flags.tray ?? false, onChange: () => flip('tray') },
  },
  { id: 'theme', kind: 'setting', label: 'Theme', icon: icon('palette'), breadcrumb: ['Settings', 'Look'], description: 'Dark' },
];

const ACTIONS: readonly PaletteEntry[] = [
  { id: 'bug', kind: 'action', label: 'Report a bug', icon: icon('bug') },
  { id: 'updates', kind: 'action', label: 'Check for updates', icon: icon('refresh-cw') },
  { id: 'dev-tools', kind: 'action', label: 'Show developer tools', icon: icon('cpu'), checked: false },
  { id: 'sync', kind: 'action', label: 'Sync profiles', icon: icon('upload'), description: 'Needs a signed in account', disabled: true },
];

const KIND_LABELS: Record<PaletteKind, string> = { screen: 'Screens', setting: 'Settings', action: 'Actions' };

const matches = (entry: PaletteEntry, query: string): boolean =>
  matchesText([entry.label, ...(entry.breadcrumb ?? [])].join(' '), query);

const paletteGroups = (query: string, flags: Flags, flip: (id: string) => void): CommandPaletteGroup<PaletteEntry>[] => {
  if (query.trim() === '') return [{ id: 'screens', label: KIND_LABELS.screen, items: SCREENS }];
  const hits = [...SCREENS, ...settings(flags, flip), ...ACTIONS].filter((entry) => matches(entry, query));
  return (['screen', 'setting', 'action'] as const).map((kind) => ({
    id: kind, label: KIND_LABELS[kind], items: hits.filter((entry) => entry.kind === kind),
  }));
};

export { paletteGroups };
export type { PaletteEntry };
