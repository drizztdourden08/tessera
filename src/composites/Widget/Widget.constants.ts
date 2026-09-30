/* @layer renderer-components @kind data */
import type { IconName } from '../../primitives/Icon';

const TITLEBAR_HEIGHT = 38;

const DEFAULT_LAYOUT_STORAGE_KEY = 'widget-layout';

const POSITION_OPTIONS: { value: 'left' | 'right' | 'top' | 'bottom' | 'float'; icon: IconName; title: string }[] = [
  { value: 'left', icon: 'panel-left', title: 'Dock left' },
  { value: 'right', icon: 'panel-right', title: 'Dock right' },
  { value: 'top', icon: 'panel-top', title: 'Dock top' },
  { value: 'bottom', icon: 'panel-bottom', title: 'Dock bottom' },
  { value: 'float', icon: 'picture-in-picture-2', title: 'Float' },
];

export { DEFAULT_LAYOUT_STORAGE_KEY, POSITION_OPTIONS, TITLEBAR_HEIGHT };
