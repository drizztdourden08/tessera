/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { registeredKitKinds, resolveFieldKit } from '../../src/composites/field-kits';
import { Box } from '../../src/primitives';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { KIT_START, resolveKitOptions, sampleFieldFor } from './_samples/data-kits';

type FieldKitsArgs = {
  disabled: boolean;
};

const KIT_COLUMNS = [{ key: 'editor', label: 'Editor' }, { key: 'cell', label: 'Cell' }] as const;

const KitTable = ({ disabled }: FieldKitsArgs) => {
  const [values, setValues] = useState<Record<string, unknown>>(KIT_START);
  const kinds = registeredKitKinds().filter((kind) => resolveFieldKit(kind) && sampleFieldFor(kind));
  return (
    <Demonstrator
      corner="Kind"
      rows={kinds.map((kind) => ({ key: kind, label: `${kind} (${sampleFieldFor(kind)?.label ?? ''})` }))}
      columns={KIT_COLUMNS}
      fill
      align="stretch"
      cell={(kind, column) => {
        const kit = resolveFieldKit(kind);
        const field = sampleFieldFor(kind);
        if (!kit || !field) return null;
        const value = values[field.path];
        if (column === 'cell') return <Box>{kit.renderCell(value, field)}</Box>;
        const { EditorControl } = kit;
        return (
          <EditorControl
            field={field}
            value={value}
            disabled={disabled}
            resolveIdRefOptions={resolveKitOptions}
            onChange={(next) => setValues((prev) => ({ ...prev, [field.path]: next }))}
          />
        );
      }}
    />
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
