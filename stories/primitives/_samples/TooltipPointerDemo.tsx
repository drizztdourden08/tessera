/* @layer stories @kind component */
import { Box, Shortcut, Text, Tooltip } from '../../../src/primitives';
import type { MouseButton, ShortcutKey } from '../../../src/primitives';

type HintRow = { mouse: MouseButton; keys?: ShortcutKey; label: string };

type HintSlot = { title: string; rows: readonly HintRow[] };

const SLOTS: readonly HintSlot[] = [
  { title: 'Bow', rows: [{ mouse: 'left', label: 'pick the arrows' }, { mouse: 'wheel', label: 'step the count' }] },
  { title: 'Bottles', rows: [{ mouse: 'left', label: 'pick the contents' }, { mouse: 'drag', label: 'swap two bottles' }] },
  { title: 'Hearts', rows: [{ mouse: 'wheel', label: 'add or take one' }, { keys: 'shift', mouse: 'left', label: 'fill them all' }] },
];

const HintCard = (props: { slot: HintSlot }) => {
  const { title, rows } = props.slot;
  return (
    <Box className="tooltip-demo__card">
      <Text className="tooltip-demo__title">{title}</Text>
      {rows.map((row) => (
        <Box key={row.label} className="tooltip-demo__row">
          <Shortcut size="xs" keys={row.keys ?? []} mouse={row.mouse} />
          <Text as="span">{row.label}</Text>
        </Box>
      ))}
    </Box>
  );
};

const TooltipPointerDemo = () => (
  <Box className="story-column">
    <Text className="story-label">Move the pointer over each slot; the hint follows it and stays inside the window</Text>
    <Box className="tooltip-demo__slots">
      {SLOTS.map((slot) => (
        <Tooltip key={slot.title} follow="pointer" content={<HintCard slot={slot} />} className="tooltip-demo__slot">
          <Text as="span">{slot.title}</Text>
        </Tooltip>
      ))}
    </Box>
  </Box>
);

export { TooltipPointerDemo };
