/* @layer renderer-components @kind component */
import { Badge } from '../../../primitives/Badge';
import { Box } from '../../../primitives/Box';
import { Glyph } from '../../../primitives/Glyph';
import { Pressable } from '../../../primitives/Pressable';
import { Text } from '../../../primitives/Text';
import { groupKeyContent } from '../behavior/group-key-content';
import { INDENT_STEP } from './GroupRow.constants';
import type { CSSProperties } from 'react';
import type { GroupRowProps } from './GroupRow.type';

const GroupRow = (props: GroupRowProps) => {
  const { level, groupKey, field, count, expanded, onToggle, display } = props;
  const indent: CSSProperties = { paddingLeft: `calc(${INDENT_STEP} * ${level + 1})` };

  return (
    <Box className="data-table__group" style={indent} role="row">
      <Pressable
        className="data-table__group-toggle"
        aria-label={expanded ? 'Collapse group' : 'Expand group'}
        aria-expanded={expanded}
        onClick={onToggle}
      >
        <Text className="data-table__chevron"><Glyph name={expanded ? 'chevronDown' : 'chevronRight'} /></Text>
        <Text className="data-table__group-key">{groupKeyContent(groupKey, field, display)}</Text>
      </Pressable>
      <Box className="data-table__group-total">
        {field && <Text className="data-table__group-field">{field.label}</Text>}
        <Badge variant="neutral" className="data-table__group-count">{String(count)}</Badge>
      </Box>
    </Box>
  );
};

export { GroupRow };
