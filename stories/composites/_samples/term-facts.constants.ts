/* @layer stories @kind data */
import type { FactsPanelGroup } from '../../../src/composites';

const SHORTCUT_TERMS: FactsPanelGroup = [
  { label: 'F1', value: 'Save to the current slot' },
  { label: 'F2', value: 'Load from the current slot' },
  { label: 'F5', value: 'Reset the game' },
  { label: 'Tab', value: 'Hold to fast forward' },
  { label: 'Ctrl + M', value: 'Mute or unmute audio' },
];

const RELEASE_TERMS: FactsPanelGroup = [
  { label: 'Auto', value: 'Remaining items go out when a player finishes their goal.' },
  { label: 'Manual', value: 'A finished player sends their items with a command.' },
  { label: 'Disabled', value: 'Items stay put until each player collects them in their own world.' },
];

export { RELEASE_TERMS, SHORTCUT_TERMS };
