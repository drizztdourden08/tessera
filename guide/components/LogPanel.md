# LogPanel

A running log, such as a server log or a simulation trace, in one framed box with search, filters, a line count and Copy all.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { LogPanel } from '@drizztdourden08/tessera';
```

The source is `src/composites/LogPanel/LogPanel.tsx`. Its gallery page is Composites · Content/LogPanel (`#/story/composites-logpanel--overview`).

## Where the questions lead here

What are you placing? Data. What data are you showing? A stream of log lines.

LogPanel shows a running log with search, filters, the newest lines first in view and rows the user can pick.

## Use it when

- Lines arrive over time and the user reads, searches and filters them, such as a server log or the trace of a run.
- The user picks some lines to copy or act on, such as the lines to attach to a bug report.

## Use something else when

- The rows have columns to sort and resize. Use `DataTable` instead.
- A job shows its steps, with a short log under them. Use [TaskProgress](TaskProgress.md) instead.
- The text is code or a fixed block to read and copy. Use `CodeBlock` instead.

## Rules

- Give each row a stable id: the window, the new line behaviour and the selection all follow it.
- Pass kinds with a tone per type; toneMessage colours the message too, as for errors.
- Set strong on a kind whose messages mark a step, such as a session that starts; they draw in semibold.
- Pass selectedIds with onSelectionChange to let the user pick rows; the app holds the set and copies or acts on it.
- Put the action on the picked rows in toolbarExtra, such as Copy selected or Report these lines, beside the line count.
- Pass height="fill" inside a box that sets the height, or a number for a fixed height in pixels.

## Accessibility

- Without a selection the log is one focusable region that the arrow keys scroll.
- With selectedIds the rows are options of a listbox: Up and Down move the pick, Shift extends it, and a click with Shift picks the rows between.
- Each time cell carries the review mask, so screenshots of a running log compare run to run.

## Example

```tsx
import { Button, LogPanel } from '@drizztdourden08/tessera';
import type { LogRow } from '@drizztdourden08/tessera';
import { useState } from 'react';

const ServerLog = ({ rows, onReport }: { rows: readonly LogRow[]; onReport: (lines: readonly LogRow[]) => void }) => {
  const [selected, setSelected] = useState<ReadonlySet<string>>(new Set());
  const picked = rows.filter((row) => selected.has(row.id));
  return (
    <LogPanel
      rows={rows}
      kinds={[{ id: 'error', label: 'Errors', tone: 'danger', toneMessage: true }]}
      selectedIds={selected}
      onSelectionChange={setSelected}
      toolbarExtra={<Button size="sm" disabled={picked.length === 0} onClick={() => onReport(picked)}>Report these lines</Button>}
      height="fill"
    />
  );
};
```

## Props

- `rows`: `readonly LogRow[]`.
- `kinds` (optional): `readonly LogKindDef[]`.
- `search` (optional): `string`.
- `onSearchChange` (optional): `(query: string) => void`.
- `filters` (optional): `readonly FilterClause[]`.
- `onFiltersChange` (optional): `(next: readonly FilterClause[]) => void`.
- `toolbar` (optional): `boolean`. Default `true`.
- `copyText` (optional): `(shown: readonly LogRow[]) => string`. Default `logAsText`.
- `countLabel` (optional): `string`.
- `emptyLabel` (optional): `string`. Default `panels.logEmpty`.
- `toolbarExtra` (optional): `ReactNode`.
- `height` (optional): `LogPanelHeight`.
- `selectedIds` (optional): `ReadonlySet<string>`.
- `onSelectionChange` (optional): `(ids: ReadonlySet<string>) => void`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-hairline`, `--c-hover`, `--c-inset`, `--c-primary`, `--c-selected`, `--c-text`, `--c-text-muted`, `--font-mono`, `--leading-normal`, `--log-gutter-w`, `--log-tag-w`, `--shadow-2`, `--space-lg`, `--space-md`, `--space-sm`, `--space-xs`, `--text-sm`, `--text-xs`, `--weight-semi`, `--z-base`.
