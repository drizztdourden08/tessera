/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Text } from '../../../primitives/Text';
import { summaryLine } from '../behavior/summaryLine';
import { TableOptionsMenu } from './TableOptionsMenu';
import { DEFAULT_COUNT_LABEL } from './TableFooter.constants';
import type { TableFooterProps } from './TableFooter.type';
import './TableFooter.css';

const TableFooter = (props: TableFooterProps) => {
  const {
    count, countLabel = DEFAULT_COUNT_LABEL, sortActive, groupActive, fieldNodes, actions, summary,
  } = props;
  const noun = count === 1 ? countLabel[0] : countLabel[1];
  const line = summaryLine(summary);

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
