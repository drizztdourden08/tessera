/* @layer stories @kind component */
import { useRef, useState } from 'react';
import { Anchored, Box, Button, ButtonRow, Pressable, ScrollArea, Text } from '../../../src/primitives';
import type { AnchoredRect } from '../../../src/primitives';

const CELLS = Array.from({ length: 24 }, (_, at) => at + 1);

const rectOfCell = (cell: HTMLElement | null): AnchoredRect | null => {
  if (cell === null) return null;
  const { left, top, width, height } = cell.getBoundingClientRect();
  return { left, top, width, height };
};

const AnchoredRectDemo = () => {
  const [picked, setPicked] = useState<number | null>(3);
  const cells = useRef(new Map<number, HTMLElement>());
  const surface = useRef<HTMLDivElement | null>(null);

  return (
    <Box className="anchored-demo__stage">
      <ScrollArea className="anchored-demo__scroller" ref={surface}>
        <Box className="anchored-demo__cells">
          {CELLS.map((cell) => (
            <Pressable
              key={cell}
              ref={(node) => { if (node) cells.current.set(cell, node); }}
              className="anchored-demo__cell"
              aria-pressed={picked === cell}
              onClick={() => setPicked(cell)}
            >
              {cell}
            </Pressable>
          ))}
        </Box>
      </ScrollArea>
      {picked !== null && (
        <Anchored
          anchorRect={() => rectOfCell(cells.current.get(picked) ?? null)}
          boundary={surface}
          placement="top-center"
          className="anchored-demo__panel"
        >
          <ButtonRow>
            <Text>{`Cell ${String(picked)}`}</Text>
            <Button size="sm" variant="secondary" onClick={() => setPicked(null)}>Close</Button>
          </ButtonRow>
        </Anchored>
      )}
    </Box>
  );
};

export { AnchoredRectDemo };
