/* @layer renderer-components @kind component */
import { Table, TableCell, TableRow, TableSection } from '../../primitives/Table';
import { DEFAULT_GHOST } from './PairedTree.constants';
import { PairedTreeCell } from './sub-components/PairedTreeCell';
import type { PairedTreeProps } from './PairedTree.type';
import './PairedTree.css';

const PairedTree = (props: PairedTreeProps) => {
  const { columns, rows, ghost = DEFAULT_GHOST, label, className } = props;
  return (
    <Table aria-label={label} className={className ? `paired-tree ${className}` : 'paired-tree'}>
      <TableSection head>
        <TableRow>
          {columns.map((column) => (
            <TableCell key={column.id} header width={column.width}>{column.title}</TableCell>
          ))}
        </TableRow>
      </TableSection>
      <TableSection>
        {rows.map((row) => (
          <TableRow key={row.id} tone={row.tone}>
            {columns.map((column) => (
              <PairedTreeCell key={column.id} value={row.cells[column.id]} depth={row.depth} ghost={ghost} />
            ))}
          </TableRow>
        ))}
      </TableSection>
    </Table>
  );
};

export { PairedTree };
