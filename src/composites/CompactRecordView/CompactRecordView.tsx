/* @layer renderer-components @kind component */
import { Fragment, useMemo } from 'react';
import { Box } from '../../primitives/Box';
import { Text } from '../../primitives/Text';
import { Span } from '../../primitives/text-elements';
import { layoutGroups } from '../RecordEditor';
import { filterGroups } from './behavior/filter-groups';
import { CompactField } from './sub-components/CompactField';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { CompactRecordViewProps } from './CompactRecordView.type';
import '../../theme/compact-record-view.css';

const CompactRecordView = <T,>(props: CompactRecordViewProps<T>) => {
  const { record, schema, config, groups, resolveIdRefDisplay, diffs, fieldRenderers } = props;
  const { records } = useTesseraStrings();
  const laidOut = useMemo(() => layoutGroups(schema, records, config), [schema, records, config]);
  const shown = useMemo(() => filterGroups(laidOut, groups), [laidOut, groups]);
  const showLabels = shown.length > 1;

  return (
    <Box className="compact-record-view">
      {shown.length === 0 && <Text variant="caption" className="compact-record-view__empty">{records.noFieldsToShow}</Text>}
      {shown.map((group) => (
        <Box key={group.id} className="compact-record-view__group">
          {showLabels && (
            <Span className="compact-record-view__group-label">{group.label ?? group.id}</Span>
          )}
          {group.fields.map((field) => {
            const render = fieldRenderers?.get(field.path);
            if (render) return <Fragment key={field.path}>{render(record)}</Fragment>;
            return <CompactField key={field.path} record={record} field={field} depth={0} resolveIdRefDisplay={resolveIdRefDisplay} diffs={diffs} />;
          })}
        </Box>
      ))}
    </Box>
  );
};

export { CompactRecordView };
