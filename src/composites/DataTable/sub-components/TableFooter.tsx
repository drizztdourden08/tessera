/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Text } from '../../../primitives/Text';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { summaryLine } from '../behavior/summary-line';
import { TableOptionsMenu } from './TableOptionsMenu';
import type { TableFooterProps } from './TableFooter.type';
import './TableFooter.css';

const TableFooter = (props: TableFooterProps) => {
  const {
    count, countLabel, sortActive, groupActive, fieldNodes, actions, summary,
  } = props;
  const { table } = useTesseraStrings();
  const [one, many] = countLabel ?? [table.entry, table.entries];
  const noun = count === 1 ? one : many;
  const line = summaryLine(summary, table);

  return (
    <Box className="data-table__footer">
      <Text className="data-table__summary">{line}</Text>
      <Box className="data-table__footer-right">
        <Text className="data-table__count">{`${count} ${noun}`}</Text>
        <TableOptionsMenu
          sortActive={sortActive}
          groupActive={groupActive}
          fieldNodes={fieldNodes}
          actions={actions}
        />
      </Box>
    </Box>
  );
};

export { TableFooter };
