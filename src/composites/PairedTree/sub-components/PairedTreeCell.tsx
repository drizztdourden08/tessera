/* @layer renderer-components @kind component */
import { TableCell } from '../../../primitives/Table';
import { Text } from '../../../primitives/Text';
import type { PairedTreeCellProps } from '../PairedTree.type';

const PairedTreeCell = (props: PairedTreeCellProps) => {
  const { value, depth, ghost } = props;
  if (value === undefined) {
    return (
      <TableCell className="paired-tree__cell paired-tree__cell--ghost">
        <Text as="div" tone="faint" indent={depth}>{ghost}</Text>
      </TableCell>
    );
  }
  return (
    <TableCell className="paired-tree__cell">
      <Text as="div" indent={depth}>{value}</Text>
    </TableCell>
  );
};

export { PairedTreeCell };
