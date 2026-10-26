/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Stack, Table, TableCell, TableRow, TableSection } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';

type TableArgs = Record<string, never>;

const meta = {
  title: 'Primitives · Display/Table',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<TableArgs>;

const KEYS: readonly (readonly [string, string, string])[] = [['W', 'Move up', '1'], ['S', 'Move down', '22'], ['Space', 'Jump', '305']];

const Plain = {
  name: 'Plain and striped',
  render: () => (
    <Stack gap="md">
      {[false, true].map((striped) => (
        <Table key={String(striped)} striped={striped} aria-label={striped ? 'Striped keys' : 'Keys'}>
          <TableSection head>
            <TableRow>
              <TableCell header>Key</TableCell>
              <TableCell header>Action</TableCell>
              <TableCell header align="right">Uses</TableCell>
            </TableRow>
          </TableSection>
          <TableSection>
            {KEYS.map(([key, action, uses]) => (
              <TableRow key={key}>
                <TableCell>{key}</TableCell>
                <TableCell>{action}</TableCell>
                <TableCell align="right">{uses}</TableCell>
              </TableRow>
            ))}
          </TableSection>
        </Table>
      ))}
    </Stack>
  ),
} satisfies StoryLiteStoryDefinition<TableArgs>;

const Aligned = {
  name: 'Left, centre and right columns',
  render: () => (
    <Table striped aria-label="Alignment">
      <TableSection head>
        <TableRow>
          <TableCell header align="left">Left</TableCell>
          <TableCell header align="center">Centre</TableCell>
          <TableCell header align="right">Right</TableCell>
        </TableRow>
      </TableSection>
      <TableSection>
        <TableRow>
          <TableCell align="left">a</TableCell>
          <TableCell align="center">b</TableCell>
          <TableCell align="right">c</TableCell>
        </TableRow>
      </TableSection>
    </Table>
  ),
} satisfies StoryLiteStoryDefinition<TableArgs>;

const CODE = `import { Table, TableCell, TableRow, TableSection } from '@drizztdourden08/tessera';

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
      <TableCell align="right">1</TableCell>
    </TableRow>
  </TableSection>
</Table>`;

const Overview = overviewStory({
  component: 'Table',
  importName: 'Table',
  description: 'A small static table for facts that are only read: a border, a heavier head and padded cells.',
  points: [
    '`Table` holds `TableSection` parts: `head` draws the header rows, the other draws the body.',
    '`TableRow` holds `TableCell` parts; `header` makes a cell a column heading and `align` sets its text side.',
    '`striped` shades every second body row.',
    'A table wider than its box scrolls sideways inside its border.',
    'Name the table with `aria-label`; it takes the other table attributes too.',
  ],
  instead: '[DataTable] for rows the user sorts, filters, selects or resizes.',
  variants: [Plain, Aligned],
  code: CODE,
});

export default meta;
export { Aligned, Overview, Plain };
