/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { FormRow } from '../../src/composites';
import { Box, TextInput } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import type { StateProps } from '../_template/states/states.type';
import { PresetOptionsDemo } from './_samples/PresetOptionsDemo';
import './_samples/option-editor-story.css';

type FormRowArgs = {
  label: string;
  description: string;
  changed: boolean;
  advanced: boolean;
  problem: string;
};

const ARG_TYPES: PlaygroundArgTypes<FormRowArgs> = {
  label: { group: 'Content', control: 'text' },
  description: { group: 'Content', control: 'text' },
  changed: { group: 'State', control: 'boolean', description: 'Marks the row as changed and turns on its reset button.' },
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
  description: 'One option of a long form: its name and help on the left, its control in the middle, a reset at the end.',
  points: [
    '`changed` marks the row and turns on the reset button, which calls `onReset`.',
    '`advanced` tags an option most people leave alone; `problem` writes an alert under the control.',
    'The control gets the id, label and notes of the row, as inside a [Field].',
    'Under 640 px the control goes under the name, with the reset kept on the first line.',
    'A description past `descriptionLines` lines, 2 by default, folds behind More and Less.',
  ],
  instead: '[SettingsRow] for an app setting with a live hint, or [Field] for a plain form.',
  playground: Playground,
  variants: [Editor, Folded],
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
export { Editor, Folded, Overview, Playground };
