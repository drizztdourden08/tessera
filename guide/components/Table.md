# Table

A small static table for facts that are only read: a border, a heavier head, padded cells and optional zebra rows.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/primitives`.

```tsx
import { Table } from '@drizztdourden08/tessera';
```

The source is `src/primitives/Table/Table.tsx`. Its gallery page is Primitives · Display/Table (`#/story/primitives-table--overview`).

## Where the questions lead here

What are you placing? Data. What data are you showing? A small table of facts that is only read.

Table draws a static table from TableSection, TableRow and TableCell; DataTable is the table the user sorts and filters.

## Use it when

- A few rows of fixed facts, such as the keys of a game and what they do.
- Text from Markdown is drawn with Tessera parts: Markdown draws every GitHub table with Table.

## Use something else when

- Rows the user sorts, filters, selects, groups or resizes. Use [DataTable](DataTable.md) instead.
- One label and its value on a line. Use `StatRow` instead.

## Rules

- Build it from parts: Table holds TableSection parts, a TableSection holds TableRow parts and a TableRow holds TableCell parts.
- Pass head on the first TableSection for the header rows; the other TableSection is the body.
- Pass header on a TableCell of the head so it is a column heading; pass align left, center or right for the side its text sits on.
- Pass striped to shade every second body row.
- Pass aria-label to Table to name it. The other table attributes pass through.
- A table wider than its box scrolls sideways inside its border; keep the cells to short text.

## Accessibility

- It is a real table with a head and a body, so a screen reader reads each cell with its column heading.
- Name the table with aria-label when the page has more than one.

## Example

```tsx
import { Table, TableCell, TableRow, TableSection } from '@drizztdourden08/tessera';

const Keys = () => (
  <Table striped aria-label="Keys">
    <TableSection head>
      <TableRow>
        <TableCell header>Key</TableCell>
        <TableCell header align="right">Uses</TableCell>
      </TableRow>
    </TableSection>
    <TableSection>
      <TableRow>
        <TableCell>W</TableCell>
        <TableCell align="right">120</TableCell>
      </TableRow>
    </TableSection>
  </Table>
);
```

## Props

- `striped` (optional): `boolean`. Default `false`.
- `children` (optional): `ReactNode`.

It also takes the 285 attributes it inherits through `Omit<TableHTMLAttributes<HTMLTableElement>, 'align'>`.

## Tokens

It draws on `--border-width-thin`, `--c-bg`, `--c-border`, `--c-hairline`, `--c-hover`, `--c-surface`, `--c-text`, `--leading-normal`, `--radius-md`, `--space-sm`, `--space-xs`, `--text-sm`, `--weight-semi`.

## Also exported from this folder

`TableCell`, `TableRow`, `TableSection`.
