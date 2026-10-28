/* @layer renderer-components @kind data */
import type { HookUsage } from '../../guide/usage.type';

const usage = {
  job: 'Set many toggles with one drag: press a toggle, drag over the others in a column, and they all take the value the first one got.',
  useWhen: [
    'A column of toggles, such as the eye or the lock of each layer, is set in bulk by dragging down the column.',
    'A grid of on and off cells is painted by one press and a drag across the cells.',
  ],
  avoidWhen: [
    { case: 'The user picks items by dragging a rectangle over them.', use: 'useMarqueeSelect' },
    { case: 'One toggle is pressed on its own and needs no drag.', use: 'Toggle' },
    { case: 'The items are picked, not switched, with Ctrl and Shift.', use: 'useSelectionModel' },
  ],
  rules: [
    'Pass onSet(key, value), which the hook calls once for each key a sweep touches, and spread bind(key, current) on the element around each toggle with the value it shows now.',
    'The first press sets every key of the sweep to the opposite of the pressed toggle, so the drag paints one value.',
    'A key touched twice in one sweep is reported once, even when the pointer goes back over it.',
    'Pass onEnd(keys, value) to hear the finished sweep once, such as to push one undo step for all the keys.',
    'Pass order, the keys as they are shown, so a fast drag that skips a row still sets the rows between the two it touched.',
    'The hook follows the pointer on the window, so the drag may leave the column and come back, and it ends on release or cancel.',
    'A mouse or touch click inside a bound element is taken by the sweep and does not reach the onChange of the toggle in it; a key press does, so keep onChange for the keyboard.',
    'Set touch-action to none on the bound elements, so a finger drag sweeps and does not scroll.',
    'sweeping is true while a drag runs, for a look such as a held column.',
  ],
  a11y: [
    'Every toggle keeps its own key press, Space or Enter, so the sweep is never the only way to switch.',
    'Announce the end of a sweep in a polite live region, such as 5 layers hidden, since a drag changes no focus.',
  ],
  example: `import { useState } from 'react';
import { Box, Toggle, useToggleSweep } from '@drizztdourden08/tessera';

const Visibility = ({ ids }: { ids: string[] }) => {
  const [hidden, setHidden] = useState<ReadonlySet<string>>(new Set());
  const set = (id: string, value: boolean) => setHidden((now) => new Set(value ? [...now, id] : [...now].filter((key) => key !== id)));
  const sweep = useToggleSweep({ order: ids, onSet: set });
  return ids.map((id) => (
    <Box key={id} {...sweep.bind(id, hidden.has(id))}>
      <Toggle label={id} checked={hidden.has(id)} onChange={(value) => set(id, value)} />
    </Box>
  ));
};
`,
  propsHash: 'd306592edb1c6b90',
} satisfies HookUsage;

export { usage };
