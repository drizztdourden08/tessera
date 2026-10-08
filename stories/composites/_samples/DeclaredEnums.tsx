/* @layer stories @kind component */
import { useState } from 'react';
import { resolveFieldKit } from '../../../src/composites/field-kits';
import { buildSchema } from '../../../src/data';
import { Box, Field, Text } from '../../../src/primitives';
import { Demonstrator } from '../../_template/Demonstrator';

const START: Record<string, unknown> = { weight: 2, region: 'north' };

const ROWS = [START];

const FIELDS = buildSchema(ROWS, {
  options: {
    weight: [{ value: 1, label: 'Light' }, { value: 2, label: 'Medium' }, { value: 3, label: 'Heavy' }],
    region: [
      { value: 'north', label: 'Frozen Coast' },
      { value: 'south', label: 'Sunken Marshes' },
      { value: 'east', label: 'Eastern Highlands' },
    ],
  },
});

const WIDTHS = [{ key: 'wide', label: 'A wide row' }, { key: 'narrow', label: 'A narrow row' }] as const;

const DeclaredEnums = () => {
  const [record, setRecord] = useState(START);
  const kit = resolveFieldKit('enum');
  if (!kit) return null;
  const { EditorControl } = kit;
  return (
    <Demonstrator
      rows={WIDTHS}
      align="stretch"
      cell={(width) => (
        <Box className={`field-kits-story__row field-kits-story__row--${width}`}>
          {FIELDS.map((field) => (
            <Field key={field.path} label={field.label}>
              <EditorControl field={field} value={record[field.path]} onChange={(next) => setRecord((was) => ({ ...was, [field.path]: next }))} />
            </Field>
          ))}
          <Text className="story-label">weight holds {JSON.stringify(record.weight)}, a {typeof record.weight}</Text>
        </Box>
      )}
    />
  );
};

export { DeclaredEnums };
