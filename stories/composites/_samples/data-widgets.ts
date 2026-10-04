/* @layer stories @kind data */
import { createDefaultLayout, dockOnEdge } from '../../../src/composites';
import type { DockEdge, WidgetDefinition, WidgetLayout, WidgetPersistenceIO } from '../../../src/composites';

const WIDGET_DEFINITIONS: readonly WidgetDefinition[] = [
  {
    id: 'players', label: 'Players', defaultVisibility: 'context-only', defaultSide: 'left',
    defaultDockedSize: 260, defaultFloatingSize: { width: 280, height: 320 },
  },
  {
    id: 'log', label: 'Server log', defaultVisibility: 'always', defaultSide: 'bottom',
    defaultDockedSize: 170, defaultFloatingSize: { width: 480, height: 220 }, popOut: true, padding: 'none', fill: true,
  },
  {
    id: 'hints', label: 'Hints', defaultVisibility: 'context-only', defaultSide: 'right',
    defaultDockedSize: 280, defaultFloatingSize: { width: 300, height: 280 },
  },
  {
    id: 'console', label: 'Console', defaultVisibility: 'always', defaultSide: 'right',
    defaultDockedSize: 300, defaultFloatingSize: { width: 340, height: 200 }, fill: true,
  },
];

const PRESET_DOCKED: readonly [string, DockEdge, boolean][] = [['players', 'left', true], ['hints', 'right', false], ['log', 'bottom', true]];

const presetLayout = (): WidgetLayout => {
  const docked = PRESET_DOCKED.reduce((acc, [id, edge, makeRoom]) => dockOnEdge(acc, id, edge, makeRoom), createDefaultLayout());
  return { ...docked, floating: [{ id: 'console', x: 0.34, y: 0.1, width: 340, height: 200 }] };
};

const PROFILE_ID = 'story-host';
const STORAGE_KEY = 'tessera-stories:widget-dock';

const profiles = new Map<string, Record<string, unknown>>();

const MEMORY_IO: WidgetPersistenceIO = {
  load: (profileId) => Promise.resolve(profiles.get(profileId) ?? null),
  save: (profileId, blob) => {
    profiles.set(profileId, blob);
    return Promise.resolve();
  },
};

profiles.set(PROFILE_ID, { widgetLayout: presetLayout() });

export { MEMORY_IO, PROFILE_ID, STORAGE_KEY, WIDGET_DEFINITIONS };
