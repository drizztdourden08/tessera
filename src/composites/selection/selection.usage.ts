/* @layer renderer-components @kind data */
import type { HookUsage } from '../../guide/usage.type';

const usage = {
  job: 'The picking rules of a collection as one hook: a click picks one, Ctrl toggles, Shift takes a range or a rectangle, Ctrl and A takes all, Space toggles and a typed letter jumps to a label.',
  useWhen: [
    'An app draws its own list, grid or tree of items and the user picks one or many of them.',
    'A grid must take a rectangle of tiles between two clicks, and skip holes that cannot be picked.',
    'Several collections of one app, such as a table, a grid and a list, must pick by the same rules.',
  ],
  avoidWhen: [
    { case: 'Records with columns, checkboxes and a select-all box already drawn for you.', use: 'DataTable' },
    { case: 'A long grid of tiles that already takes a selection prop.', use: 'VirtualGrid' },
    { case: 'A long list or a strip of items that already takes a selection prop.', use: 'VirtualList' },
    { case: 'The user picks by dragging a rectangle over items.', use: 'useMarqueeSelect' },
  ],
  rules: [
    'Pass order, the keys of the items in the order they are shown, and selected with onChange; the app keeps the set and the hook keeps only the anchor of the last click.',
    'Call click(key, event) from a click, passing the event; Ctrl or Cmd toggles, Shift extends from the anchor and Ctrl with Shift adds the range to what is picked.',
    'Pass onPick to hear a plain click on one item, such as to open it; a toggle or a range does not call it.',
    'Pass seed, a key, to start a Shift range from an item that is already current when nothing was clicked yet.',
    'On a grid pass cellOf(key), the row and column of a key; Shift then takes the rectangle between the anchor and the key instead of a line.',
    'Pass isHole(key) for items that cannot be picked; clicks, ranges, rectangles and select all skip them.',
    'Wire onKeyDown(event, key) on each item: Ctrl or Cmd with A picks all, Space toggles, Shift with Space extends, Escape clears and acts only when something is picked.',
    'The key handler acts only when the item itself has focus, so a field inside an item keeps its own keys.',
    'For type ahead pass labelOf(key) and onFocusKey(key); a typed letter calls onFocusKey with the next key whose label starts with the typed text, and the text resets after a short pause.',
    'For a Shift with arrow range, call step(from, to, keep) from your own focus move, where from is the key that held focus.',
    'Use allState, checkAll, selectAll and clear for a select-all box; checkAll toggles the shown keys, and selectAll picks every key that is not a hole.',
    'The helpers rangeBetween, rectKeys, toggledKey and typeAheadIndex are the same math without the hook.',
  ],
  a11y: [
    'Mark each picked item with aria-selected and give the collection aria-multiselectable, since the hook sets no attribute.',
    'Every choice by pointer has a key: Space, Ctrl and A, Shift with Space or with the arrows, and Escape.',
    'Type ahead moves focus to the match, so a reader hears the item it lands on.',
  ],
  example: `import { useState } from 'react';
import { Box, useSelectionModel } from '@drizztdourden08/tessera';

const Names = ({ names }: { names: string[] }) => {
  const [picked, setPicked] = useState<ReadonlySet<string>>(new Set());
  const model = useSelectionModel({ order: names, selected: picked, onChange: setPicked });
  return (
    <Box role="listbox" aria-multiselectable="true" aria-label="Names">
      {names.map((name) => (
        <Box
          key={name}
          role="option"
          tabIndex={0}
          aria-selected={model.isSelected(name)}
          onClick={(event) => model.click(name, event)}
          onKeyDown={(event) => model.onKeyDown(event, name)}
        >
          {name}
        </Box>
      ))}
    </Box>
  );
};
`,
  propsHash: 'ae6706261c82e710',
} satisfies HookUsage;

export { usage };
