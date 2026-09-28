/* @layer renderer-components @kind data */
const TITLEBAR_HEIGHT = 38;

const DEFAULT_LAYOUT_STORAGE_KEY = 'widget-layout';

const POSITION_OPTIONS: { value: 'left' | 'right' | 'top' | 'bottom' | 'float'; label: string }[] = [
  { value: 'left', label: '◧' },
  { value: 'right', label: '◨' },
  { value: 'top', label: '▽' },
  { value: 'bottom', label: '△' },
  { value: 'float', label: '⊡' },
];

export { DEFAULT_LAYOUT_STORAGE_KEY, POSITION_OPTIONS, TITLEBAR_HEIGHT };
