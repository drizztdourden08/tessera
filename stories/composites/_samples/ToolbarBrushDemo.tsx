/* @layer stories @kind component */
import { useState } from 'react';
import { Toolbar } from '../../../src/composites';
import type { ToolbarItem } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { BrushPatternPicker } from './BrushPatternPicker';

const ToolbarBrushDemo = () => {
  const [brush, setBrush] = useState('Round');
  const items: ToolbarItem[] = [
    { kind: 'button', id: 'pencil', label: 'Pencil', icon: 'pixel-pencil', onSelect: () => undefined },
    {
      kind: 'popover',
      id: 'brush',
      label: 'Brush',
      icon: 'pixel-brush-custom',
      description: 'Pick a brush or a pattern.',
      render: () => <BrushPatternPicker value={brush} onChange={setBrush} />,
    },
    { kind: 'button', id: 'eraser', label: 'Eraser', icon: 'pixel-eraser', onSelect: () => undefined },
  ];
  return (
    <Box className="toolbar-story">
      <Box className="toolbar-story__box" data-orientation="horizontal" data-extent="320">
        <Toolbar label="Brush tools" items={items} />
      </Box>
      <Text className="story-label">Brush: {brush}. Press the Brush tool, then use the arrow keys in the grid.</Text>
    </Box>
  );
};

export { ToolbarBrushDemo };
