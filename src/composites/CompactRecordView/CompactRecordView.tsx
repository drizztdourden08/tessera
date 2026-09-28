/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import { Box } from '../../primitives/Box';
import { Text } from '../../primitives/Text';
import { layoutGroups } from '../RecordEditor';
import { filterGroups } from './behavior/filter-groups';
import { CompactField } from './sub-components/CompactField';
import { NO_FIELDS } from './CompactRecordView.constants';
import type { CompactRecordViewProps } from './CompactRecordView.type';
import '../../theme/compact-record-view.css';

const CompactRecordView = <T,>(props: CompactRecordViewProps<T>) => {
  const { record, schema, config, groups, resolveIdRefDisplay, diffs } = props;
  const laidOut = useMemo(() => layoutGroups(schema, config), [schema, config]);
  const shown = useMemo(() => filterGroups(laidOut, groups), [laidOut, groups]);
  const showLabels = shown.length > 1;

  return (
    <Box className="compact-record-view">
      {shown.length === 0 && <Text className="compact-record-view__empty">{NO_FIELDS}</Text>}
      {shown.map((group) => (
        <Box key={group.id} className="compact-record-view__group">
          {showLabels && (
            <Text className="compact-record-view__group-label">{group.label ?? group.id}</Text>
          )}
          {group.fields.map((field) => (
            <CompactField
              key={field.path}
              record={record}
              field={field}
              depth={0}
              resolveIdRefDisplay={resolveIdRefDisplay}
              diffs={diffs}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
};

export { CompactRecordView };
