/* @layer stories @kind component */
import { Box, Shortcut } from '../../../src/primitives';
import type { ShortcutKey } from '../../../src/primitives';
import { PatternDocTable } from './PatternDocTable';
import type { PatternDocRow } from './PatternDocTable';

const Keys = (props: { keys: readonly ShortcutKey[] }) => (
  <Box className="pattern-story__keys">
    {props.keys.map((key) => <Shortcut key={key} keys={key} />)}
  </Box>
);

const KEY_ROWS: readonly PatternDocRow[] = [
  { key: 'Next slot', cells: [<Keys keys={['tab']} />, 'Moves to the next slot, and out of the field after the last one. Hold Shift to go back.'] },
  { key: 'Typing', cells: ['0-9  a-z', 'Fills the slot. A complete slot moves focus to the next one and opens its popover.'] },
  { key: 'Separator', cells: [<Keys keys={['.', ':', 'space']} />, 'A character the slot cannot take moves on once the slot holds something, so 192.168 types straight through.'] },
  { key: 'Back', cells: [<Keys keys={['backspace']} />, 'In an empty slot, goes back to the previous one. On a choice it clears the choice first.'] },
  { key: 'Edges', cells: [<Keys keys={['left', 'right']} />, 'At the edge of the text, moves to the slot on that side.'] },
  { key: 'Step', cells: [<Keys keys={['up', 'down']} />, 'Steps a number by its step. On a choice it moves through the list.'] },
  { key: 'Settle', cells: [<Keys keys={['enter']} />, 'Settles the slot and closes the popover. On a choice it picks the highlighted option.'] },
  { key: 'Close', cells: [<Keys keys={['esc']} />, 'Closes the popover and keeps focus in the slot.'] },
];

const PatternKeys = () => <PatternDocTable corner="Key" columns={['Press', 'Does']} rows={KEY_ROWS} />;

export { PatternKeys };
