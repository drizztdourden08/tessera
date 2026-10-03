/* @layer stories @kind data */
import type { FloatingSwitchItem } from '../../../src/composites';
import { Icon } from '../../../src/primitives';

const WORKSPACE_MODES: FloatingSwitchItem[] = [
  { id: 'game', label: 'Game', icon: <Icon name="gamepad-2" /> },
  { id: 'data', label: 'Data', icon: <Icon name="layers" /> },
];

export { WORKSPACE_MODES };
