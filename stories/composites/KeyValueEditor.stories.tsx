/* @layer stories @kind story */
import type { ReactNode } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { KeyValueKind } from '../../src/composites';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { ITEMS, START_INVENTORY } from '../primitives/_samples/option-samples.constants';
import { KeyValueEditorDemo } from './_samples/KeyValueEditorDemo';
import { KeyValueSaveDemo } from './_samples/KeyValueSaveDemo';
import type { KeyValueEditorDemoProps } from './_samples/option-editor-demos.type';

type KeyValueEditorArgs = {
  valueKind: KeyValueKind;
  listed: boolean;
  disabled: boolean;
};

const ARG_TYPES: PlaygroundArgTypes<KeyValueEditorArgs> = {
  valueKind: { group: 'Behaviour', control: 'select', options: ['count', 'number', 'text', 'select'], description: 'The control for each value.' },
  listed: { group: 'Behaviour', control: 'boolean', description: 'Names come from a list of valid items, searched by typing; off, any name can be typed.' },
  disabled: { group: 'State', control: 'boolean' },
};

const meta = {
  title: 'Composites · Inputs/KeyValueEditor',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<KeyValueEditorArgs>;

const FREE = { region: 'eu', mode: 'race' } as const;

const LISTED_WORDS = { 'Moon Pearl': 'eu', Hookshot: 'race' } as const;

const startFor = (kind: KeyValueKind, listed: boolean) => {
  if (kind === 'count' || kind === 'number') return START_INVENTORY;
  return listed ? LISTED_WORDS : FREE;
};

const CHOICES = ['eu', 'us', 'race', 'coop'] as const;

const Playground = {
  name: 'Playground',
  args: { valueKind: 'count', listed: true, disabled: false },
  argTypes: ARG_TYPES,
  render: (args) => (
    <KeyValueEditorDemo
      key={`${args.valueKind}-${String(args.listed)}`}
      start={startFor(args.valueKind, args.listed)}
      valueKind={args.valueKind}
      keys={args.listed ? ITEMS : undefined}
      options={CHOICES}
      disabled={args.disabled}
    />
  ),
} satisfies PlaygroundStory<KeyValueEditorArgs>;

const Counts = {
  name: 'Start inventory: counts of listed items',
  render: () => <KeyValueEditorDemo start={START_INVENTORY} keys={ITEMS} min={0} max={99} />,
} satisfies StoryLiteStoryDefinition<KeyValueEditorArgs>;

const Words = {
  name: 'Free names with words: one name twice holds the value back',
  render: () => <KeyValueEditorDemo start={FREE} valueKind="text" keyLabel="Setting" aria-label="Server settings" />,
} satisfies StoryLiteStoryDefinition<KeyValueEditorArgs>;

const HeldSave = {
  name: 'onProblem holds the Save of the form while a name is not on the list',
  render: () => <KeyValueSaveDemo />,
} satisfies StoryLiteStoryDefinition<KeyValueEditorArgs>;

const KINDS: Readonly<Record<KeyValueKind, ReactNode>> = {
  count: <KeyValueEditorDemo start={START_INVENTORY} keys={ITEMS} min={0} max={99} />,
  number: <KeyValueEditorDemo start={{ 'Progressive Sword': 40, Hookshot: 15 }} valueKind="number" keys={ITEMS} min={0} max={100} aria-label="Item weights" />,
  text: <KeyValueEditorDemo start={FREE} valueKind="text" keyLabel="Setting" aria-label="Server settings" />,
  select: <KeyValueEditorDemo start={FREE} valueKind="select" options={CHOICES} keyLabel="Setting" aria-label="Server settings" />,
};

const Kinds = {
  name: 'Each value kind',
  render: () => <Demonstrator rows={axis(Object.keys(KINDS) as KeyValueKind[])} align="stretch" cell={(kind) => KINDS[kind]} />,
} satisfies StoryLiteStoryDefinition<KeyValueEditorArgs>;

const CODE = `import { KeyValueEditor } from '@drizztdourden08/tessera';

<KeyValueEditor value={startInventory} onChange={setStartInventory} keys={validItems} min={0} max={99} aria-label="Start inventory" />`;

const Overview = overviewStory({
  component: 'KeyValueEditor',
  description: 'A map of names to values, row by row: a name, a value control and Remove, then an add row.',
  points: [
    '`keys` makes each name a [Combobox] of valid items; without it any name can be typed.',
    '`valueKind` picks the value control: `count` a [NumberInput] with its buttons on the sides, `number`, `text` or `select`.',
    'A name listed twice, an empty name or one not in `keys` is marked; `onChange` waits for a fix.',
    'The add row searches the items not used yet; Add puts the new row at the end.',
    '`onProblem` reports that problem, or null once fixed, so the form can hold its Save.',
  ],
  instead: '[CodeBlock] with `editable` for nested values that do not fit one row per name.',
  playground: Playground,
  variants: [Counts, Words, HeldSave, Kinds],
  states: {
    render: (props: StateProps) => <KeyValueEditorDemo start={START_INVENTORY} keys={ITEMS} {...(props as Partial<KeyValueEditorDemoProps>)} />,
    list: [STATE.idle, { name: 'Empty', props: { start: {} } }, STATE.disabled],
  },
  code: CODE,
});

export default meta;
export { Counts, HeldSave, Kinds, Overview, Playground, Words };
