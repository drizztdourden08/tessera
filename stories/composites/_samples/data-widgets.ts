/* @layer stories @kind data */
import { createDefaultLayout } from '../../../src/composites';
import type { WidgetDefinition, WidgetLayout, WidgetPersistenceIO, WidgetState } from '../../../src/composites';

const WIDGET_DEFINITIONS: readonly WidgetDefinition[] = [
  {
    id: 'players', label: 'Players', defaultVisibility: 'context-only', defaultSide: 'left',
    defaultDockedSize: 260, defaultFloatingSize: { width: 280, height: 320 },
  },
  {
    id: 'log', label: 'Server log', defaultVisibility: 'always', defaultSide: 'bottom',
    defaultDockedSize: 170, defaultFloatingSize: { width: 480, height: 220 },
  },
  {
    id: 'hints', label: 'Hints', defaultVisibility: 'context-only', defaultSide: 'right',
    defaultDockedSize: 280, defaultFloatingSize: { width: 300, height: 280 },
  },
  {
    id: 'console', label: 'Console', defaultVisibility: 'always', defaultSide: 'right',
    defaultDockedSize: 300, defaultFloatingSize: { width: 340, height: 200 },
  },
];

const PRESET: Record<string, Partial<WidgetState>> = {
  players: { visible: true, mode: 'docked', side: 'left', exclusive: true },
  hints: { visible: true, mode: 'docked', side: 'right' },
  log: { visible: true, mode: 'docked', side: 'bottom', exclusive: true },
  console: { visible: true, mode: 'floating', x: 320, y: 90, width: 340, height: 200 },
};

const presetLayout = (): WidgetLayout => ({
  widgets: createDefaultLayout(WIDGET_DEFINITIONS).widgets.map((w) => ({ ...w, ...PRESET[w.id] })),
});

const PROFILE_ID = 'story-host';
const STORAGE_KEY = 'tessera-stories:widget-dock';

const profiles = new Map<string, Record<string, unknown>>();

const seedProfile = (): void => {
  profiles.set(PROFILE_ID, { widgetLayout: presetLayout() });
};

const MEMORY_IO: WidgetPersistenceIO = {
  load: (profileId) => Promise.resolve(profiles.get(profileId) ?? null),
  save: (profileId, blob) => {
    profiles.set(profileId, blob);
    return Promise.resolve();
  },
};

seedProfile();

export { MEMORY_IO, PROFILE_ID, STORAGE_KEY, WIDGET_DEFINITIONS };
