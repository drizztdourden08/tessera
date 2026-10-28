/* @layer stories @kind hook */
import { createElement, useState } from 'react';
import type { ToolbarItem } from '../../../src/composites';
import { SIZE_OPTIONS } from './toolbar-kinds.constants';
import { ToolbarKindsPanel } from './ToolbarKindsPanel';

const INK_CHOICES = [
  { value: 'pencil', label: 'Pencil', icon: 'pencil', description: 'One pixel at a time.' },
  { value: 'eraser', label: 'Eraser', icon: 'eraser', description: 'Clear pixels.' },
  { value: 'pipette', label: 'Picker', icon: 'pipette', description: 'Take the colour under the pointer.' },
] as const;

const SHAPE_CHOICES = [
  { value: 'square', label: 'Square', icon: 'square', description: 'A square brush.' },
  { value: 'circle', label: 'Round', icon: 'circle', description: 'A round brush.' },
] as const;

const useToolKinds = (): ToolbarItem[] => {
  const [ink, setInk] = useState<string>('pencil');
  const [inkOn, setInkOn] = useState(true);
  const [shape, setShape] = useState<string>('square');
  const [size, setSize] = useState('2');
  const [grid, setGrid] = useState(false);

  return [
    {
      kind: 'group', id: 'ink', label: 'Ink', display: 'slot', value: ink, choices: INK_CHOICES, pressed: inkOn, shortcut: 'B', onChange: (value) => { setInk(value); setInkOn(true); }, onPress: () => setInkOn(true),
      badge: { glyph: 'S', description: 'Symmetry is on' },
    },
    { kind: 'group', id: 'shape', label: 'Brush shape', display: 'menu', value: shape, choices: SHAPE_CHOICES, onChange: setShape },
    { kind: 'separator', id: 'view-heading', label: 'View' },
    { kind: 'toggle', id: 'grid', label: 'Grid', icon: 'layout-grid', description: 'Show the pixel grid.', shortcut: 'G', pressed: grid, onChange: setGrid, openOn: 'hold', options: [{ id: 'size', label: 'Cell size', items: SIZE_OPTIONS.map((value) => ({ id: value, label: `${value} px`, kind: 'radio' as const, checked: size === value, onSelect: () => setSize(value) })) }] },
    { kind: 'toggle', id: 'picker', label: 'Picker', icon: 'pipette', description: 'Borrowed from the Ink slot.', shortcut: 'I', pressed: false, borrowed: true, onChange: () => setInk('pipette') },
    {
      kind: 'popover', id: 'palette', label: 'Palette', icon: 'palette', description: 'Pick the colour in a panel.', onFold: () => undefined,
      render: (close) => createElement(ToolbarKindsPanel, { onDone: close }),
    },
  ];
};

export { useToolKinds };
