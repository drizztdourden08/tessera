/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { registeredKitKinds, resolveFieldKit } from '../../src/composites/field-kits';
import { Box, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { KIT_START, resolveKitOptions, sampleFieldFor } from './_samples/data-kits';
import './FieldKits.stories.css';

type FieldKitsArgs = {
  disabled: boolean;
};

const KitTable = ({ disabled }: FieldKitsArgs) => {
  const [values, setValues] = useState<Record<string, unknown>>(KIT_START);
  return (
    <Box className="field-kits-story">
      <Text className="story-label">Kind</Text>
      <Text className="story-label">Editor</Text>
      <Text className="story-label">Cell</Text>
      {registeredKitKinds().map((kind) => {
        const kit = resolveFieldKit(kind);
        const field = sampleFieldFor(kind);
        if (!kit || !field) return null;
        const value = values[field.path];
        const { EditorControl } = kit;
        return (
          <Box key={kind} className="field-kits-story__row">
            <Text className="story-label">{`${kind} (${field.label})`}</Text>
            <EditorControl
              field={field}
              value={value}
              disabled={disabled}
              resolveIdRefOptions={resolveKitOptions}
              onChange={(next) => setValues((prev) => ({ ...prev, [field.path]: next }))}
            />
            <Box>{kit.renderCell(value, field)}</Box>
          </Box>
        );
      })}
    </Box>
  );
};

const ARGS: Partial<FieldKitsArgs> = { disabled: false };

const ARG_TYPES: StoryLiteArgTypes<FieldKitsArgs> = {
    disabled: { control: 'boolean' },
  };

const meta = {
  title: 'Composites · Data views/Field kits',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<FieldKitsArgs>;

const AllKits = {
  name: 'Every registered kit',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <KitTable {...args} />,
} satisfies StoryLiteStoryDefinition<FieldKitsArgs>;

const CODE = `// Importing the field-kits module registers the nine built-in kits.
import { resolveFieldKit } from '@drizztdourden08/tessera/field-kits';

const kit = resolveFieldKit(field.kind);
if (!kit) return null;
const { EditorControl } = kit;

// The control that edits the value
<EditorControl field={field} value={value} onChange={setValue} />

// The same value as a table cell
{kit.renderCell(value, field)}`;

const Overview = overviewStory({
  component: 'resolveFieldKit',
  description: 'Field kits are the rendering half of each field kind in a schema: string, number, boolean, enum, reference, array, object, union and unknown. RecordEditor, DataTable, CompactRecordView and FilterBar all draw fields through them, so a kind looks the same everywhere. Each kit gives an editor control, a filter control and a compact table cell, and resolveFieldKit returns the kit for a kind. A new kind is one registerFieldKit call.',
  variants: [AllKits],
  code: CODE,
});

export default meta;
export { AllKits, Overview };
