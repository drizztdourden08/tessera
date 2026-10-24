/* @layer renderer-components @kind data */
import type { HookUsage } from '../../guide/usage.type';

const usage = {
  job: 'The windowing of a long list of equal rows: which rows to draw for the scroll position, and which row to keep while it holds focus.',
  useWhen: [
    'An app builds its own long list or table of rows of one height and draws only the rows in view.',
    'A focused row must stay drawn when it scrolls out of view, so the keys keep working.',
  ],
  avoidWhen: [
    { case: 'A list of rows the app draws itself, with the keys already handled.', use: 'VirtualList' },
    { case: 'Records with columns to sort, group or resize.', use: 'DataTable' },
  ],
  rules: [
    'Pass enabled, the count of rows, keyAt that gives the stable key of a row, the rootRef of the box that scrolls and the attribute that marks a row index.',
    'Put bodyRef on the element that holds the rows and size it to count times the row height; draw only the indices it returns.',
    'Place each row by its index with absolute position, and mark it with the index attribute so the focus is found.',
    'Wire onScroll to the scroll of the root, and onFocus and onBlur to the body, so a focused row stays drawn.',
    'Keep keyAt stable with useCallback; a new function on every render measures again.',
    'Pass sizeKey, any string that changes with the row height, so the rows are measured again; sizeVariable turns a size token name into the var() of that token.',
    'Use scrollTopToShow to find the scroll position that brings a row into view.',
  ],
  a11y: [
    'A row that holds focus stays in the document while it is outside the window, so the keys and the screen reader keep their place.',
    'Give each row its position and the size of the list with aria-posinset and aria-setsize, since the rest are not in the page.',
  ],
  example: `import { useCallback, useRef } from 'react';
import { Box, useVirtualWindow } from '@drizztdourden08/tessera';

const ROW_ATTRIBUTE = 'data-row';

const Rows = ({ names }: { names: string[] }) => {
  const rootRef = useRef<HTMLElement>(null);
  const keyAt = useCallback((index: number) => names[index], [names]);
  const windowed = useVirtualWindow({ enabled: true, count: names.length, keyAt, rootRef, indexAttribute: ROW_ATTRIBUTE });
  return (
    <Box ref={rootRef} onScroll={windowed.onScroll}>
      <Box ref={windowed.bodyRef} onFocus={windowed.onFocus} onBlur={windowed.onBlur}>
        {windowed.indices.map((at) => (
          <Box key={names[at]} {...{ [ROW_ATTRIBUTE]: at }}>{names[at]}</Box>
        ))}
      </Box>
    </Box>
  );
};
`,
  propsHash: 'f2802695eb92be60',
} satisfies HookUsage;

export { usage };
