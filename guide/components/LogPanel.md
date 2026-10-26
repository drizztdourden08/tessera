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

- The rows have columns to sort and resize. Use [DataTable](DataTable.md) instead.
- A job shows its steps, with a short log under them. Use [TaskProgress](TaskProgress.md) instead.
- The text is code or a fixed block to read and copy. Use `CodeBlock` instead.

## Rules

- Give each row a stable id: the window, the new line behaviour and the selection all follow it.
- Pass kinds with a tone per type: a text tone, a tag tint such as teal, or an app hex colour, lifted until it reads.
- Set toneMessage to colour the message in the same tone, as for errors, or to a tone of its own, such as dim.
- Set strong on a kind whose messages mark a step, such as a session that starts, and uppercase to set them in capitals.
- Pass selectedIds with onSelectionChange to let the user pick rows; the app holds the set and copies or acts on it.
- Put the action on the picked rows in toolbarExtra, such as Copy selected or Report these lines, beside the line count.
- Set ansi for lines that carry colour codes, such as a build or process output; other escape codes are stripped, never drawn.
- Ansi draws the sixteen colours, bold, dim, italic and underline; 256 and true colour map to the nearest of the sixteen.
- Follow is on: the view stays at the end while lines arrive, and a scroll up stops it until Jump to bottom is pressed.
- Set follow={false} to leave the view where the reader put it; set onInput to add a prompt row for a process that reads lines.
- OnInput gets each line on Enter; Up and Down walk the lines sent. Echo the line back as a row yourself.
- Pass height="fill" inside a box that sets the height, or a number for a fixed height in pixels.

## Accessibility

- Without a selection the log is one focusable region that the arrow keys scroll.
- With selectedIds the rows are options of a listbox: Up and Down move the pick, Shift extends it, and a click with Shift picks the rows between.
- The input row is a labelled text field; the prompt mark is hidden from screen readers.
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
- `copyText` (optional): `(shown: readonly LogRow[]) => string`.
- `countLabel` (optional): `string`.
- `emptyLabel` (optional): `string`. Default `panels.logEmpty`.
- `toolbarExtra` (optional): `ReactNode`.
- `height` (optional): `LogPanelHeight`.
- `selectedIds` (optional): `ReadonlySet<string>`.
- `onSelectionChange` (optional): `(ids: ReadonlySet<string>) => void`.
- `ansi` (optional): `boolean`.
- `follow` (optional): `boolean`.
- `onInput` (optional): `(text: string) => void`.
- `prompt` (optional): `string`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-border`, `--c-focus`, `--c-hairline`, `--c-hover`, `--c-inset`, `--c-selected`, `--c-surface`, `--c-term-bg-black`, `--c-term-bg-blue`, `--c-term-bg-cyan`, `--c-term-bg-green`, `--c-term-bg-magenta`, `--c-term-bg-red`, `--c-term-bg-white`, `--c-term-bg-yellow`, `--c-term-black`, `--c-term-blue`, `--c-term-bright-black`, `--c-term-bright-blue`, `--c-term-bright-cyan`, `--c-term-bright-green`, `--c-term-bright-magenta`, `--c-term-bright-red`, `--c-term-bright-white`, `--c-term-bright-yellow`, `--c-term-cyan`, `--c-term-green`, `--c-term-magenta`, `--c-term-red`, `--c-term-white`, `--c-term-yellow`, `--c-text`, `--c-text-muted`, `--font-mono`, `--leading-normal`, `--log-gutter-w`, `--log-ink`, `--log-tag-w`, `--opacity-muted`, `--shadow-2`, `--space-lg`, `--space-md`, `--space-sm`, `--space-xs`, `--text-sm`, `--text-xs`, `--weight-bold`, `--weight-semi`, `--z-base`.
