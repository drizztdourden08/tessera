/* @layer stories @kind data */
import type { SegmentOption } from '../../../src/primitives';

const DOCK_OPTIONS: SegmentOption[] = [
  { value: 'left', icon: 'panel-left', hint: { label: 'Dock left', description: 'Takes the left edge of the app' } },
  { value: 'right', icon: 'panel-right', hint: { label: 'Dock right', description: 'Takes the right edge of the app' } },
  { value: 'top', icon: 'panel-top', hint: { label: 'Dock top', description: 'Takes the top edge of the app' } },
  { value: 'bottom', icon: 'panel-bottom', hint: { label: 'Dock bottom', description: 'Takes the bottom edge of the app' } },
  { value: 'float', icon: 'picture-in-picture-2', hint: { label: 'Float', description: 'Hovers over the main view, free to move' } },
  { value: 'window', icon: 'app-window', hint: { label: 'Own window', description: 'Leaves the app for a window of its own' } },
];

const VIEW_OPTIONS: SegmentOption[] = [
  { value: 'always', icon: 'eye', hint: { label: 'Always', description: 'Stays open all the time' } },
  { value: 'context', icon: 'play', hint: { label: 'In a session', description: 'Shows only while a session runs' } },
  { value: 'never', icon: 'eye-off', hint: { label: 'Hidden', description: 'Stays closed until you open it' } },
];

export { DOCK_OPTIONS, VIEW_OPTIONS };
