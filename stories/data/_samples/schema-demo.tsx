/* @layer stories @kind component */
import { useMemo } from 'react';
import { buildSchema, createSchemaIndex } from '../../../src/data';
import type { FieldDescriptor } from '../../../src/data';
import { Box, Text } from '../../../src/primitives';
import { axis } from '../../_template/axis';
import { Demonstrator } from '../../_template/Demonstrator';
import { LOCATIONS, LOCATION_CONFIG } from './data-locations';

const detailOf = (field: FieldDescriptor): string => {
  if (field.options) return `options: ${field.options.join(', ')}`;
  if (field.targetKind) return `points at: ${field.targetKind}`;
  if (field.of) return `element: ${field.of.kind}`;
  if (field.children) return `children: ${field.children.map((child) => child.label).join(', ')}`;
  return '';
};

const COLUMNS = axis(['Label', 'Kind', 'Flags', 'Detail']).map((column) => ({ ...column, fill: column.key === 'Detail' }));

const fieldCell = (field: FieldDescriptor, column: string) => {
  if (column === 'Label') return <Text>{field.label}</Text>;
  if (column === 'Kind') return <Text className="engine-grid__mono">{field.kind}</Text>;
  if (column === 'Flags') return <Text>{[field.optional && 'optional', field.hidden && 'hidden'].filter(Boolean).join(', ')}</Text>;
  return <Text>{detailOf(field)}</Text>;
};

const SchemaDemo = ({ applyConfig }: { applyConfig: boolean }) => {
  const fields = useMemo(() => buildSchema(LOCATIONS, applyConfig ? LOCATION_CONFIG : undefined), [applyConfig]);
  const all = useMemo(() => createSchemaIndex(fields).all(), [fields]);
  const byPath = new Map(all.map((field) => [field.path, field]));
  return (
    <Box className="story-column">
      <Text className="story-label">{`${all.length} fields derived from ${LOCATIONS.length} rows`}</Text>
      <Demonstrator
        corner="Path"
        rows={axis(all.map((field) => field.path))}
        columns={COLUMNS}
        align="start"
        cell={(path, column) => {
          const field = byPath.get(path);
          return field ? fieldCell(field, column) : null;
        }}
      />
    </Box>
  );
};

export { SchemaDemo };
