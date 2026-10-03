/* @layer stories @kind data */
import type { FloatingSwitchItem } from '../../../src/composites';
import { Icon } from '../../../src/primitives';
import { NAV_ICONS } from './nav';

const LAYER_WINDOWS: FloatingSwitchItem[] = [
  { id: 'sessions', label: 'Sessions', icon: <Icon name={NAV_ICONS.sessions} /> },
  { id: 'players', label: 'Players', icon: <Icon name={NAV_ICONS.players} /> },
];

export { LAYER_WINDOWS };
