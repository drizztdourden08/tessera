/* @layer stories @kind data */
import type { MenuGroup } from '../../../src/composites';
import type { PlaygroundArgTypes } from '../../_template/controls/playground.type';
import type { ToolbarArgs, ToolId } from './toolbar-story.type';

const TOOL_NAMES: Readonly<Record<ToolId, string>> = {
  pencil: 'Pencil',
  eraser: 'Eraser',
  bucket: 'Fill',
  pipette: 'Picker',
  hand: 'Pan',
};

const TOOL_NOTES: Readonly<Record<ToolId, string>> = {
  pencil: 'Draw one pixel at a time.',
  eraser: 'Clear pixels back to transparent.',
  bucket: 'Fill a connected area with the colour.',
  pipette: 'Pick the colour under the pointer.',
  hand: 'Move the view around the canvas.',
};

const TOOL_KEYS: Readonly<Record<ToolId, string>> = { pencil: 'P', eraser: 'E', bucket: 'G', pipette: 'I', hand: 'H' };

const SIZE_KEYS = [{ label: 'Smaller', keys: '[' }, { label: 'Larger', keys: ']' }] as const;

const BRUSH_SIZES: readonly number[] = [1, 2, 4, 8];

const brushGroups = (size: number, shape: string, onSize: (value: number) => void, onShape: (value: string) => void): MenuGroup[] => [
  {
    id: 'brush-size',
    label: 'Brush size',
    items: BRUSH_SIZES.map((value) => ({
      id: `size-${String(value)}`, label: `${String(value)} px`, kind: 'radio' as const, checked: size === value, shortcut: String(value), onSelect: () => onSize(value),
    })),
  },
  {
    id: 'brush-shape',
    label: 'Brush shape',
    items: ['Square', 'Round'].map((label) => ({
      id: label.toLowerCase(), label, kind: 'radio' as const, checked: shape === label.toLowerCase(), onSelect: () => onShape(label.toLowerCase()),
    })),
  },
];

const TOOLBAR_ARGS: ToolbarArgs = { orientation: 'horizontal', handle: true, size: 'sm', extent: '640', layout: 'bar', openOn: 'hover' };

const TOOLBAR_ARG_TYPES: PlaygroundArgTypes<ToolbarArgs> = {
  orientation: { group: 'Layout', control: 'select', options: ['horizontal', 'vertical'], description: 'Horizontal shows the caption beside the icon; vertical shows icons only.' },
  handle: { group: 'Content', control: 'boolean', description: 'The grip at the start, which a dock can wire to move the toolbar.' },
  layout: { group: 'Layout', control: 'select', options: ['bar', 'list'], description: 'A bar of buttons, or a list of rows with the name, description and shortcut of each tool.' },
  openOn: { group: 'Content', control: 'select', options: ['hover', 'click'], description: 'How the Pencil opens its menu with the pointer.' },
  size: { group: 'Appearance', control: 'select', options: ['xs', 'sm', 'md'] },
  extent: { group: 'Layout', control: 'select', options: ['160', '240', '320', '640'], description: 'The length of the box around the toolbar, in pixels; items that do not fit fold into More.' },
};

const TOOLBAR_CODE = `import { Toolbar } from '@drizztdourden08/tessera';

<Toolbar
  label="Drawing tools"
  orientation="vertical"
  handle
  items={[
    {
      kind: 'toggle', id: 'pencil', label: 'Pencil', icon: 'pencil', description: 'Draw one pixel at a time.',
      shortcut: 'P', pressed: tool === 'pencil', onChange: () => setTool('pencil'), options: brushOptions,
    },
    { kind: 'toggle', id: 'eraser', label: 'Eraser', icon: 'eraser', shortcut: 'E', pressed: tool === 'eraser', onChange: () => setTool('eraser') },
    { kind: 'separator', id: 'after-tools' },
    { kind: 'number', id: 'size', label: 'Brush size', value: size, min: 1, max: 16, onChange: setSize },
  ]}
/>`;

export { brushGroups, SIZE_KEYS, TOOL_KEYS, TOOL_NAMES, TOOL_NOTES, TOOLBAR_ARG_TYPES, TOOLBAR_ARGS, TOOLBAR_CODE };
