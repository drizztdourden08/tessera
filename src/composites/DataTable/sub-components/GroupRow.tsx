/* @layer renderer-components @kind component */
import { Badge } from '../../../primitives/Badge';
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { Pressable } from '../../../primitives/Pressable';
import { Text } from '../../../primitives/Text';
import { Span } from '../../../primitives/text-elements';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { groupKeyContent } from '../behavior/group-key-content';
import { INDENT_PROPERTY, INDENT_STEP } from './GroupRow.constants';
import type { CSSProperties } from 'react';
import type { GroupRowProps } from './GroupRow.type';
import './GroupRow.css';

const GroupRow = (props: GroupRowProps) => {
  const { level, groupKey, field, count, expanded, onToggle, display } = props;
  const strings = useTesseraStrings();
  const { table } = strings;
  const indent = { [INDENT_PROPERTY]: `calc(${INDENT_STEP} * ${level + 1})` } as CSSProperties;

  return (
    <Box className="data-table__group" style={indent} role="row">
      <Box className="data-table__group-bar" role="gridcell">
        <Pressable
          className="data-table__group-toggle"
          aria-label={expanded ? table.collapseGroup : table.expandGroup}
          aria-expanded={expanded}
          onClick={onToggle}
        >
          <Span tone="dim" className="data-table__chevron"><Icon name={expanded ? 'chevron-down' : 'chevron-right'} /></Span>
          <Text className="data-table__group-key">{groupKeyContent(groupKey, field, display, strings)}</Text>
        </Pressable>
        <Box className="data-table__group-total">
          {field && <Span tone="muted" className="data-table__group-field">{field.label}</Span>}
          <Badge variant="inline" color="primary" value={count} />
        </Box>
      </Box>
    </Box>
  );
};

export { GroupRow };
