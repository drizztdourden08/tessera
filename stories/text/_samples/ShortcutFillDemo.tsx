/* @layer stories @kind component */
import { Box, Shortcut, Text } from '../../../src/primitives';
import type { MouseButton, ShortcutKey } from '../../../src/primitives';
import './shortcut-fill.css';

type FillSample = { label: string; slot: string; keys?: ShortcutKey; mouse?: MouseButton };

const FILL_SAMPLES: readonly FillSample[] = [
  { label: '1 key unit', slot: '1', keys: 'Q' },
  { label: '1.5 key units', slot: '1-5', keys: 'tab' },
  { label: '2.25 key units', slot: '2-25', keys: 'enter' },
  { label: '6.25 key units', slot: '6-25', keys: 'space' },
  { label: '2 units tall', slot: 'tall', keys: '+' },
  { label: 'Mouse in a box', slot: 'mouse', mouse: 'left' },
];

const ShortcutFillDemo = () => (
  <Box className="story-list shortcut-fill">
    {FILL_SAMPLES.map((sample) => (
      <Box key={sample.label} className="story-list__item">
        <Text className="story-label">{sample.label}</Text>
        <Box className={`shortcut-fill__slot shortcut-fill__slot--${sample.slot}`}>
          {sample.mouse ? <Shortcut mouse={sample.mouse} fill /> : <Shortcut keys={sample.keys ?? []} fill />}
        </Box>
      </Box>
    ))}
  </Box>
);

export { ShortcutFillDemo };
