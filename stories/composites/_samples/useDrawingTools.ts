/* @layer stories @kind hook */
import { useState } from 'react';
import type { ToolbarItem } from '../../../src/composites';
import { brushGroups, TOOL_KEYS, TOOL_NAMES, TOOL_NOTES } from './toolbar-story.constants';
import type { ToolId } from './toolbar-story.type';

const TOOL_ICONS = { pencil: 'pencil', eraser: 'eraser', bucket: 'paint-bucket', pipette: 'pipette', hand: 'hand' } as const;

const PIXEL_TOOL_ICONS = { pencil: 'pixel-pencil', eraser: 'pixel-eraser', bucket: 'pixel-fill-bucket', pipette: 'pixel-eyedropper', hand: 'pixel-hand' } as const;

const TOOL_ORDER: readonly ToolId[] = ['pencil', 'eraser', 'bucket', 'pipette', 'hand'];

const useDrawingTools = (captions: boolean, pixel = false) => {
  const [tool, setTool] = useState<ToolId>('pencil');
  const [size, setSize] = useState(2);
  const [shape, setShape] = useState('square');
  const [grid, setGrid] = useState(true);
  const [mirror, setMirror] = useState('off');
  const [last, setLast] = useState('none');
  const note = (text: string) => () => setLast(text);

  const tools: ToolbarItem[] = TOOL_ORDER.map((id) => ({
    kind: 'toggle',
    id,
    label: TOOL_NAMES[id],
    caption: captions ? TOOL_NAMES[id] : undefined,
    icon: (pixel ? PIXEL_TOOL_ICONS : TOOL_ICONS)[id],
    description: TOOL_NOTES[id],
    shortcut: TOOL_KEYS[id],
    pressed: tool === id,
    onChange: () => setTool(id),
    options: id === 'pencil' ? brushGroups(size, shape, setSize, setShape) : undefined,
  }));

  const items: ToolbarItem[] = [
    ...tools,
    { kind: 'separator', id: 'after-tools' },
    { kind: 'number', id: 'size', label: 'Brush size', description: 'Pixels across, from 1 to 16.', shortcut: '[', value: size, min: 1, max: 16, onChange: setSize },
    {
      kind: 'group',
      id: 'mirror',
      label: 'Mirror',
      value: mirror,
      onChange: setMirror,
      choices: [
        { value: 'off', label: 'No mirror', icon: 'square', description: 'Draw only where the pointer is.' },
        { value: 'both', label: 'Mirror both ways', icon: 'circle', description: 'Repeat each stroke across the centre lines.', shortcut: 'M' },
      ],
    },
    { kind: 'toggle', id: 'grid', label: 'Grid', icon: 'layout-grid', description: 'Show the pixel grid over the canvas.', shortcut: 'Ctrl+G', pressed: grid, onChange: setGrid },
    { kind: 'separator', id: 'before-history' },
    { kind: 'button', id: 'undo', label: 'Undo', icon: 'undo-2', description: 'Take back the last stroke.', shortcut: 'Ctrl+Z', onSelect: note('Undo') },
    { kind: 'button', id: 'redo', label: 'Redo', icon: 'redo-2', description: 'Bring back the stroke you took back.', shortcut: 'Ctrl+Shift+Z', onSelect: note('Redo') },
  ];

  return { items, tool, size, shape, last };
};

export { useDrawingTools };
