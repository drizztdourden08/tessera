/* @layer stories @kind data */
import type { ActionTileProps } from '../../../src/composites';
import type { ActionTileSet } from './ActionTileBoard.type';

const SEED = '48213907715260934413';

const actionTileSamples = (say: (text: string) => void): Readonly<Record<ActionTileSet, readonly ActionTileProps[]>> => ({
  session: [
    { label: 'Players', icon: 'users', value: '2 / 3', unit: 'connected', meta: 'Cleo is offline', onOpen: () => say('Opened the Players widget'), openLabel: 'Show the Players widget' },
    { label: 'Address', icon: 'link', value: 'localhost:38281', meta: 'Players join here', action: { label: 'Copy address', copy: 'localhost:38281' } },
    { label: 'Hints', icon: 'sparkles', value: '4', unit: 'open', meta: '2 found', onOpen: () => say('Opened the Hints widget'), openLabel: 'Show the Hints widget' },
    {
      label: 'Uptime', icon: 'clock', value: '42 min', status: { label: 'hosting', tone: 'success' }, meta: 'Auto shutdown after 2 h idle',
      action: { label: 'Stop', icon: 'square', tone: 'danger', onSelect: () => say('Stopped the room') },
    },
  ],
  storage: [
    {
      label: 'Session runs', icon: 'history', value: '1.6 GB', meta: '14 runs, oldest 3 months ago',
      tools: [{ label: 'Open the runs folder', icon: 'folder-open', onSelect: () => say('Opened the runs folder') }],
      action: { label: 'Clean old runs', icon: 'trash-2', onSelect: () => say('Cleaned old runs') },
    },
    {
      label: 'Installed worlds', icon: 'gamepad-2', value: '512 MB', meta: '9 worlds, 3 with updates',
      tools: [{ label: 'Open the worlds folder', icon: 'folder-open', onSelect: () => say('Opened the worlds folder') }],
      action: { label: 'Update all', icon: 'download', tone: 'primary', onSelect: () => say('Updating 3 worlds') },
    },
    {
      label: 'Engine', icon: 'cpu', value: '288 MB', meta: 'Archipelago 0.6.7', status: { label: 'ready', tone: 'success' },
      tools: [{ label: 'Open the engine folder', icon: 'folder-open', onSelect: () => say('Opened the engine folder') }],
      action: { label: 'Rebuild engine', icon: 'refresh-cw', tone: 'danger', onSelect: () => say('Rebuilding the engine') },
    },
    {
      label: 'Presets', icon: 'sliders-horizontal', value: '23', unit: 'presets', meta: '410 KB',
      tools: [{ label: 'Open the presets folder', icon: 'folder-open', onSelect: () => say('Opened the presets folder') }, { label: 'Copy the presets path', copy: String.raw`C:\Archipelia\Presets` }],
      action: { label: 'Export presets', icon: 'download', onSelect: () => say('Exported 23 presets') },
    },
  ],
  small: [
    { size: 'sm', label: 'Seed', value: SEED, action: { label: 'Copy seed', copy: SEED } },
    { size: 'sm', label: 'Server', icon: 'server', value: 'Home NAS', tone: 'danger', status: { label: 'failing', tone: 'danger' }, meta: '2 of 5 checks failed', action: { label: 'Test again', icon: 'refresh-cw', onSelect: () => say('Testing Home NAS') } },
  ],
});

export { actionTileSamples };
