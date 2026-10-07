/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { registeredKitKinds, resolveFieldKit } from '../../src/composites/field-kits';
import { Box } from '../../src/primitives';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { KIT_START, resolveKitOptions, sampleFieldFor } from './_samples/data-kits';
import { NamedByRow } from './_samples/NamedByRow';

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

const NAMED_KINDS = ['string', 'number', 'boolean', 'enum', 'idRef'] as const;

const NamedKits = () => {
  const [values, setValues] = useState<Record<string, unknown>>(KIT_START);
  const fields = NAMED_KINDS.map(sampleFieldFor).filter((field) => field !== undefined);
  return (
    <NamedByRow
      rows={fields.map((field) => ({
        id: `kit-${field.path}`,
        label: field.label,
        control: (labelId: string) => {
          const Control = resolveFieldKit(field.kind)?.EditorControl;
          if (!Control) return null;
          const change = (next: unknown) => setValues((prev) => ({ ...prev, [field.path]: next }));
          return <Control field={field} value={values[field.path]} aria-labelledby={labelId} resolveIdRefOptions={resolveKitOptions} onChange={change} />;
        },
      }))}
    />
  );
};

const ARGS: Partial<FieldKitsArgs> = { disabled: false };

const ARG_TYPES: PlaygroundArgTypes<FieldKitsArgs> = {
    disabled: { group: 'State', control: 'boolean' },
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
} satisfies PlaygroundStory<FieldKitsArgs>;

const Named = {
  name: 'Each editor named by the label of a FormRow, through aria-labelledby',
  render: () => <NamedKits />,
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
  description: 'How each kind of field is drawn, so a string or a reference looks the same in every data view.',
  points: [
    'Each kind has a kit: an editor control, a filter control and a compact table cell.',
    'The kinds are string, number, boolean, enum, reference, array, object, union and unknown.',
    '[RecordEditor], [DataTable], [CompactRecordView] and [FilterBar] all draw fields through the kits.',
    '`resolveFieldKit(kind)` returns the kit for a kind; `registerFieldKit` adds a new kind.',
    '`EditorControl` takes `aria-label` or `aria-labelledby`, so the name of a [FormRow] can name the control.',
  ],
  variants: [AllKits, Named],
  code: CODE,
});

export default meta;
export { AllKits, Named, Overview };
