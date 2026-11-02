/* @layer stories @kind component */
import { useState } from 'react';
import { Box, Text } from '../../../src/primitives';
import { PointerPalette } from '../../../src/composites';
import type { PalettePoint, PaletteSection } from '../../../src/composites';
import './PointerPaletteDemo.css';

type PointerPaletteDemoArgs = { holding: boolean };

const SECTIONS: readonly PaletteSection[] = [
  {
    id: 'draw',
    label: 'Draw',
    items: [
      { id: 'pencil', icon: { name: 'pencil' }, label: 'Pencil', shortcut: 'b' },
      { id: 'eraser', icon: { name: 'eraser' }, label: 'Eraser', shortcut: 'e' },
      { id: 'search', icon: { name: 'search' }, label: 'Picker', shortcut: 'i' },
      { id: 'plus', icon: { name: 'plus' }, label: 'Fill', shortcut: 'g' },
    ],
  },
  {
    id: 'view',
    label: 'View',
    items: [
      { id: 'eye', icon: { name: 'eye' }, label: 'Zoom', shortcut: 'z' },
      { id: 'folder', icon: { name: 'folder' }, label: 'Hand', shortcut: 'h' },
      { id: 'star', icon: { name: 'star' }, label: 'Locked', disabled: true },
    ],
  },
];

const PointerPaletteDemo = ({ holding = true }: Partial<PointerPaletteDemoArgs>) => {
  const [at, setAt] = useState<PalettePoint | null>(null);
  const [picked, setPicked] = useState('pencil');
  return (
    <Box className="pointer-palette-demo">
      <Box className="pointer-palette-demo__target" onPointerDown={(event) => setAt({ x: event.clientX, y: event.clientY })}>
        <Text as="span">Press here and let go over a tool, or tap to keep it open</Text>
      </Box>
      <Text className="story-label">Active: {picked}</Text>
      <PointerPalette
        aria-label="Tools"
        open={at !== null}
        at={at ?? { x: 0, y: 0 }}
        sections={SECTIONS}
        value={picked}
        holding={holding}
        onPick={setPicked}
        onClose={() => setAt(null)}
      />
    </Box>
  );
};

export { PointerPaletteDemo };
export type { PointerPaletteDemoArgs };
