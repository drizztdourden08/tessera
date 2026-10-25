/* @layer stories @kind data */
import type { StatusBarAction, StatusBarEntry } from '../../../src/composites';
import type { StatusBarSampleArgs } from './status-bar-sample.type';

const STATUS_BAR_ARGS: StatusBarSampleArgs = {
  cursor: '24, 17', zoom: '800%', colour: '#e8505b', size: '64 x 64', layer: 'Outline', frame: '3 / 8',
};

const noop = (): void => undefined;

const STATUS_BAR_ACTIONS: readonly StatusBarAction[] = [
  { id: 'sync', label: 'Sync the project', icon: 'refresh-cw', onSelect: noop },
  { id: 'save', label: 'Saving', icon: 'save', onSelect: noop, loading: true },
  { id: 'export', label: 'Export is off', icon: 'upload', onSelect: noop, disabled: true },
];

const pixelEditorItems = (args: StatusBarSampleArgs): readonly StatusBarEntry[] => [
  { id: 'cursor', label: 'Cursor', value: args.cursor, icon: 'move', title: 'Pixel under the pointer' },
  { id: 'zoom', label: 'Zoom', value: args.zoom, icon: 'zoom-in', priority: 2 },
  { id: 'colour', label: 'Colour', value: args.colour, swatch: args.colour, title: 'Current drawing colour' },
  { id: 'size', label: 'Size', value: args.size, icon: 'maximize-2', priority: 3 },
  { id: 'layer', label: 'Layer', value: args.layer, icon: 'rows-3', align: 'end', priority: 1 },
  { id: 'frame', label: 'Frame', value: args.frame, icon: 'columns-3', align: 'end', priority: 1 },
];

export { pixelEditorItems, STATUS_BAR_ACTIONS, STATUS_BAR_ARGS };
