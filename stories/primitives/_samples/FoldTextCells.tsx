/* @layer stories @kind component */
import { Box, FoldText, Table, TableCell, TableRow, TableSection } from '../../../src/primitives';
import '../FoldText.stories.css';

const PATHS = [
  'C:/Users/mira/projects/tessera/src/primitives/FoldText/FoldText.tsx',
  'C:/Users/mira/projects/archipelia/src/screens/settings/ProfileSettings.tsx',
  'notes.txt',
] as const;

type FoldTextCellsProps = {
  middle: boolean;
};

const FoldTextCells = ({ middle }: FoldTextCellsProps) => (
  <Box className="fold-story__frame">
    <Table>
      <TableSection head>
        <TableRow>
          <TableCell header>Path</TableCell>
          <TableCell header align="right">Size</TableCell>
        </TableRow>
      </TableSection>
      <TableSection>
        {PATHS.map((path) => (
          <TableRow key={path}>
            <TableCell>{middle ? <FoldText truncate="middle">{path}</FoldText> : <FoldText fill lines={1} overflow="hint">{path}</FoldText>}</TableCell>
            <TableCell align="right">12 KB</TableCell>
          </TableRow>
        ))}
      </TableSection>
    </Table>
  </Box>
);

export { FoldTextCells };
