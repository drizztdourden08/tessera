/* @layer stories @kind component */
import { Fragment, useMemo } from 'react';
import { buildSchema, createSchemaIndex } from '../../../src/data';
import type { FieldDescriptor } from '../../../src/data';
import { Box, Text } from '../../../src/primitives';
import { LOCATIONS, LOCATION_CONFIG } from './data-locations';

const detailOf = (field: FieldDescriptor): string => {
  if (field.options) return `options: ${field.options.join(', ')}`;
  if (field.targetKind) return `points at: ${field.targetKind}`;
  if (field.of) return `element: ${field.of.kind}`;
  if (field.children) return `children: ${field.children.map((child) => child.label).join(', ')}`;
  return '';
};

const SchemaDemo = ({ applyConfig }: { applyConfig: boolean }) => {
  const fields = useMemo(() => buildSchema(LOCATIONS, applyConfig ? LOCATION_CONFIG : undefined), [applyConfig]);
  const all = useMemo(() => createSchemaIndex(fields).all(), [fields]);
  return (
    <Box className="story-column">
      <Text className="story-label">{`${all.length} fields derived from ${LOCATIONS.length} rows`}</Text>
      <Box className="engine-grid engine-grid--schema">
        {['Path', 'Label', 'Kind', 'Flags', 'Detail'].map((head) => (
          <Text key={head} className="engine-grid__head">{head}</Text>
        ))}
        {all.map((field) => (
          <Fragment key={field.path}>
            <Text className="engine-grid__mono">{field.path}</Text>
            <Text>{field.label}</Text>
            <Text className="engine-grid__mono">{field.kind}</Text>
            <Text>{[field.optional && 'optional', field.hidden && 'hidden'].filter(Boolean).join(', ')}</Text>
            <Text>{detailOf(field)}</Text>
          </Fragment>
        ))}
      </Box>
    </Box>
  );
};

export { SchemaDemo };
