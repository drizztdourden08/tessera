/* @layer stories @kind hook */
import { useState } from 'react';
import { Icon, IconButton, SegmentedControl, Text, Toggle } from '../../../src/primitives';
import type { ToolGroup } from '../../../src/primitives';
import { VIEW_OPTIONS } from '../../composites/_samples/studio-sample.constants';
import { SPRITE_DRAW_TOOLS } from './sprite-tools.constants';

const useSpriteTools = (): readonly ToolGroup[] => {
  const [tool, setTool] = useState('pencil');
  const [view, setView] = useState('sheet');
  const [zoom, setZoom] = useState(4);
  const [grid, setGrid] = useState(true);
  return [
    { id: 'draw', label: 'Draw', content: <SegmentedControl value={tool} onChange={setTool} options={SPRITE_DRAW_TOOLS} aria-label="Draw tool" /> },
    { id: 'view', label: 'View', content: <SegmentedControl value={view} onChange={setView} options={VIEW_OPTIONS} aria-label="View" /> },
    {
      id: 'zoom',
      label: 'Zoom',
      content: (
        <>
          <IconButton label="Zoom out" disabled={zoom === 1} onClick={() => setZoom(zoom / 2)}><Icon name="zoom-out" /></IconButton>
          <Text variant="label">{`${zoom * 100}%`}</Text>
          <IconButton label="Zoom in" disabled={zoom === 8} onClick={() => setZoom(zoom * 2)}><Icon name="zoom-in" /></IconButton>
        </>
      ),
    },
    { id: 'grid', label: 'Grid', content: <Toggle checked={grid} onChange={setGrid} label="Pixel grid" /> },
    {
      id: 'history',
      label: 'History',
      content: <><IconButton label="Undo"><Icon name="undo-2" /></IconButton><IconButton label="Redo"><Icon name="redo-2" /></IconButton></>,
    },
  ];
};

export { useSpriteTools };
