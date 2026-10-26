/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { FormRow } from '../../src/composites';
import { Box, Slider, TextInput, Toggle } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import type { StateProps } from '../_template/states/states.type';
import { PresetOptionsDemo } from './_samples/PresetOptionsDemo';
import './_samples/option-editor-story.css';

type FormRowArgs = {
  label: string;
  description: string;
  descriptionOverflow: 'more' | 'hint';
  changed: boolean;
  advanced: boolean;
  problem: string;
};

const ARG_TYPES: PlaygroundArgTypes<FormRowArgs> = {
  label: { group: 'Content', control: 'text' },
  description: { group: 'Content', control: 'text' },
  descriptionOverflow: { group: 'Content', control: 'select', options: ['more', 'hint'], description: 'more folds a long description behind More; hint keeps the row height and offers the full text in a tip.' },
  changed: { group: 'State', control: 'boolean', description: 'Marks the row as changed and shows its reset button after the name.' },
  advanced: { group: 'Content', control: 'boolean', description: 'An advanced tag after the label.' },
  problem: { group: 'State', control: 'text', description: 'A line under the control in the danger tone.' },
};

const meta = {
  title: 'Composites · Forms/FormRow',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<FormRowArgs>;

const row = (args: Partial<FormRowArgs>) => (
  <Box className="option-editor-story option-editor-story--wide">
    <FormRow
      label={args.label ?? 'Player Name'}
      description={args.description ?? 'The name other players see.'}
      descriptionOverflow={args.descriptionOverflow}
      changed={args.changed}
      advanced={args.advanced}
      problem={args.problem === '' ? undefined : args.problem}
      onReset={() => {}}
    >
      <TextInput defaultValue="Bram" />
    </FormRow>
  </Box>
);

const Playground = {
  name: 'Playground',
  args: { label: 'Player Name', description: 'The name other players see.', changed: true, advanced: false, problem: '' },
  argTypes: ARG_TYPES,
  render: (args) => row(args),
} satisfies PlaygroundStory<FormRowArgs>;

const LONG_HELP = 'Items the player starts the game with, on top of what the world gives. Each name must be an item of the game, and a count above the item limit is cut down to it. Leave the list empty to start with nothing extra.';

const Folded = {
  name: 'A long description folds after two lines, with More and Less',
  render: () => row({ label: 'Start Inventory', description: LONG_HELP }),
} satisfies StoryLiteStoryDefinition<FormRowArgs>;

const LONG_HINT = `${LONG_HELP} Names are not case sensitive. Duplicates add up, so listing an item twice gives two of it.`;

const Hint = {
  name: 'A long description clamps to its lines, with the full text in a tip beside it',
  render: () => row({ label: 'Start Inventory', description: LONG_HINT, descriptionOverflow: 'hint' }),
} satisfies StoryLiteStoryDefinition<FormRowArgs>;

const Help = {
  name: 'Help behind a question mark beside the name',
  render: () => (
    <Box className="option-editor-story option-editor-story--wide">
      <FormRow label="Death Link" help="When you die, everyone in the room with Death Link on dies too, and the other way round.">
        <TextInput defaultValue="Off" />
      </FormRow>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<FormRowArgs>;

const Edge = {
  name: 'Controls of different widths share one right edge, and only the changed row has a reset',
  render: () => (
    <Box className="option-editor-story option-editor-story--wide">
      <FormRow label="Player Name" description="The name other players see.">
        <TextInput defaultValue="Bram" />
      </FormRow>
      <FormRow label="Death Link" help="When you die, everyone in the room with Death Link on dies too." changed onReset={() => {}}>
        <Toggle checked onChange={() => {}} />
      </FormRow>
      <FormRow label="Progression Balancing" description="Moves progression earlier.">
        <Slider value={65} onChange={() => {}} min={0} max={99} input />
      </FormRow>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<FormRowArgs>;

const Editor = {
  name: 'Preset editor with FormGroupTabs and FormRow: changed counts per tab, reset per row',
  render: () => <PresetOptionsDemo />,
} satisfies StoryLiteStoryDefinition<FormRowArgs>;

const CODE = `import { FormRow, KeyValueEditor } from '@drizztdourden08/tessera';

<FormRow
  label="Start Inventory"
  description="Start with these items."
  changed={!isDefault('start_inventory')}
  onReset={() => reset('start_inventory')}
>
  <KeyValueEditor value={options.start_inventory} onChange={(value) => set('start_inventory', value)} keys={validItems} />
</FormRow>`;

const Overview = overviewStory({
  component: 'FormRow',
  description: 'One option of a long form: its name, help and reset on the left, its control on the right.',
  points: [
    '`changed` marks the row and shows a reset button after the name; it calls `onReset` and is absent when unchanged.',
    '`advanced` tags an option most people leave alone; `problem` writes an alert under the control.',
    'The control gets the id, label and notes of the row, as inside a [Field].',
    'The control column is end-aligned, so every control in a list of rows shares one right edge.',
    'A description past `descriptionLines` lines folds behind More; `descriptionOverflow="hint"` keeps the height.',
    '`help` puts a ? after the name that shows its note on hover, focus or click, for help kept off the page.',
  ],
  instead: '[SettingsRow] for an app setting with a live hint, or [Field] for a plain form.',
  playground: Playground,
  variants: [Edge, Editor, Folded, Hint, Help],
  states: {
    render: (props: StateProps) => row(props as Partial<FormRowArgs>),
    list: [
      { name: 'Default', props: {} },
      { name: 'Changed', props: { changed: true } },
      { name: 'Advanced', props: { advanced: true } },
      { name: 'Problem', props: { changed: true, problem: 'Not saved: pick a shorter name.' } },
    ],
  },
  code: CODE,
});

export default meta;
export { Edge, Editor, Folded, Help, Hint, Overview, Playground };
