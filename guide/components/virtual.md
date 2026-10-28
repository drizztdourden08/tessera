# virtual

The windowing of a long list of equal rows: which rows to draw for the scroll position, and which row to keep while it holds focus.

A hook module: functions for a screen that owns its own markup, not a component.

Import from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { readHorizontalMetrics, renderedIndices, scrollTopForSpan, scrollTopToShow, sizeVariable, stepVirtualSize, useVirtualWindow, visibleRange } from '@drizztdourden08/tessera';
```

The source is `src/composites/virtual/index.ts`.

## Use it when

- An app builds its own long list or table of rows of one height and draws only the rows in view.
- A focused row must stay drawn when it scrolls out of view, so the keys keep working.

## Use something else when

- A list of rows the app draws itself, with the keys already handled. Use [VirtualList](VirtualList.md) instead.
- Records with columns to sort, group or resize. Use [DataTable](DataTable.md) instead.

## Rules

- Pass enabled, the count of rows, keyAt that gives the stable key of a row, the rootRef of the box that scrolls and the attribute that marks a row index.
- Put bodyRef on the element that holds the rows and size it to count times the row height; draw only the indices it returns.
- Place each row by its index with absolute position, and mark it with the index attribute so the focus is found.
- Wire onScroll to the scroll of the root, and onFocus and onBlur to the body, so a focused row stays drawn.
- Keep keyAt stable with useCallback; a new function on every render measures again.
- Pass sizeKey, any string that changes with the row height, so the rows are measured again; sizeVariable turns a size token name into the var() of that token.
- Use scrollTopToShow to find the scroll position that brings a row into view, or scrollTopForSpan for a row of any height with an align of start, center, end or nearest.
- For items laid in a row, pass readHorizontalMetrics as readMetrics and place the items by left; the numbers then run along the x axis, and useVirtualFocus takes axis horizontal so the scroll and the pages follow.
- StepVirtualSize(size, by) moves a size token along the ordered steps from size-24 to size-256, such as for a slider that sets the size of tiles.
- For rows of more than one height, pass readMetrics to measure the heights and rangeOf to give the rows to draw for the scroll position; without them every row has one height.

## Accessibility

- A row that holds focus stays in the document while it is outside the window, so the keys and the screen reader keep their place.
- Give each row its position and the size of the list with aria-posinset and aria-setsize, since the rest are not in the page.

## Example

```tsx
import { useCallback, useRef } from 'react';
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
```

## What it exports

- `readHorizontalMetrics`, a function: `(root: HTMLElement, body: HTMLElement, before: VirtualMetrics) => VirtualMetrics`.
- `renderedIndices`, a function: `(range: RowRange, pinned: number) => readonly number[]`.
- `scrollTopForSpan`, a function: `(input: SpanInput, align: ScrollAlign) => number`.
- `scrollTopToShow`, a function: `(input: ShowInput) => number`.
- `sizeVariable`, a function: `(token: VirtualSize) => string`.
- `stepVirtualSize`, a function: `(size: VirtualSize, by: number) => VirtualSize`.
- `useVirtualWindow`, a hook: `(input: VirtualWindowInput) => VirtualWindow`.
- `visibleRange`, a function: `(input: VisibleRangeInput) => RowRange`.

## Types

```ts
interface RowRange {
  start: number;
  end: number;
}

type ScrollAlign = 'start' | 'center' | 'end' | 'nearest';

interface ShowInput {
  index: number;
  rowHeight: number;
  viewport: number;
  scrollTop: number;
}

interface SpanInput {
  top: number;
  height: number;
  viewport: number;
  scrollTop: number;
}

type VirtualAxis = 'vertical' | 'horizontal';

interface VirtualFocusModel {
  rootRef: RefObject<HTMLElement | null>;
  bodyRef: RefObject<HTMLElement | null>;
  tabbable: number;
  onScroll: () => void;
  onFocus: (event: FocusEvent<HTMLElement>) => void;
  onBlur: (event: FocusEvent<HTMLElement>) => void;
  activate: (index: number) => void;
  navigate: (event: KeyboardEvent<HTMLElement>, index: number) => void;
}

interface VirtualItemsInput<T> {
  items: readonly T[];
  getKey: (item: T, index: number) => string;
  overscan?: number;
  sizeKey?: string;
  axis?: VirtualAxis;
  onActiveChange?: (index: number) => void;
}

interface VirtualMetrics {
  top: number;
  viewport: number;
  rowHeight: number;
  head?: number;
}

type VirtualSize =
  | 'size-24' | 'size-28' | 'size-32' | 'size-40' | 'size-48' | 'size-56' | 'size-64'
  | 'size-80' | 'size-96' | 'size-128' | 'size-160' | 'size-192' | 'size-224' | 'size-256';

interface VirtualWindow {
  indices: readonly number[];
  metrics: VirtualMetrics;
  bodyRef: RefObject<HTMLElement | null>;
  onScroll: () => void;
  onFocus: (event: FocusEvent<HTMLElement>) => void;
  onBlur: (event: FocusEvent<HTMLElement>) => void;
}

interface VirtualWindowInput {
  enabled: boolean;
  count: number;
  keyAt: (index: number) => string | undefined;
  rootRef: RefObject<HTMLElement | null>;
  indexAttribute: string;
  overscan?: number;
  sizeKey?: string;
  readMetrics?: (root: HTMLElement, body: HTMLElement, before: VirtualMetrics) => VirtualMetrics;
  rangeOf?: (metrics: VirtualMetrics, overscan: number) => RowRange;
}

interface VisibleRangeInput {
  scrollTop: number;
  viewport: number;
  rowHeight: number;
  count: number;
  overscan: number;
}
```
