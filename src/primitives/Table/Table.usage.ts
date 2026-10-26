/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A small static table for facts that are only read: a border, a heavier head, padded cells and optional zebra rows.',
  useWhen: [
    'A few rows of fixed facts, such as the keys of a game and what they do.',
    'Text from Markdown is drawn with Tessera parts: Markdown draws every GitHub table with Table.',
  ],
  avoidWhen: [
    { case: 'Rows the user sorts, filters, selects, groups or resizes.', use: 'DataTable' },
    { case: 'One label and its value on a line.', use: 'StatRow' },
  ],
  rules: [
    'Build it from parts: Table holds TableSection parts, a TableSection holds TableRow parts and a TableRow holds TableCell parts.',
    'Pass head on the first TableSection for the header rows; the other TableSection is the body.',
    'Pass header on a TableCell of the head so it is a column heading; pass align left, center or right for the side its text sits on.',
    'Pass striped to shade every second body row.',
    'Pass aria-label to Table to name it. The other table attributes pass through.',
    'A table wider than its box scrolls sideways inside its border; keep the cells to short text.',
  ],
  a11y: [
    'It is a real table with a head and a body, so a screen reader reads each cell with its column heading.',
    'Name the table with aria-label when the page has more than one.',
  ],
  tree: {
    path: ['data', 'a small table of facts that is only read'],
    rule: 'Table draws a static table from TableSection, TableRow and TableCell; DataTable is the table the user sorts and filters.',
  },
  example: `import { Table, TableCell, TableRow, TableSection } from '@drizztdourden08/tessera';

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
`,
  propsHash: '9158c19061e5b112',
} satisfies ComponentUsage;

export { usage };
