/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { SettingsRow, SettingsSection } from '../../src/composites';
import type { SettingsDescription, SettingsInputKind, SettingsItem } from '../../src/composites';
import { Box, Tag } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { ChoiceFitDemo } from './_samples/ChoiceFitDemo';
import { everyKind, KIND_ORDER, rowOfKind } from './_samples/every-kind';
import { RowMarksDemo } from './_samples/RowMarksDemo';
import { useSampleSettings } from './_samples/settings-sample-state';

type RowArgs = {
  kind: SettingsInputKind;
  compact: boolean;
  readOnly: boolean;
  disabled: boolean;
  description: boolean;
  changed: boolean;
  badge: boolean;
  problem: string;
  actions: boolean;
  busy: boolean;
};

const sampleActions = (busy: boolean): SettingsItem['actions'] => [
  { id: 'rebuild', label: 'Rebuild', loading: busy, onSelect: () => undefined },
  { id: 'forget', label: 'Forget', tone: 'danger', confirm: 'Forget it?', onSelect: () => undefined },
];

const KindDemo = (props: RowArgs) => {
  const { kind, compact, readOnly, disabled, description, changed, badge, problem, actions, busy } = props;
  const row = rowOfKind(useSampleSettings(), kind);
  if (row === undefined) return null;
  const text: SettingsDescription = description ? { description: row.description ?? 'What this setting changes, in one line.' } : { noDescription: true };
  return (
    <Box className="story-column">
      <SettingsSection>
        <SettingsRow
          id={row.id}
          title={row.title}
          hint={row.hint}
          input={row.input}
          {...text}
          compact={compact}
          readOnly={readOnly}
          disabled={disabled}
          changed={changed}
          onReset={() => undefined}
          badge={badge ? <Tag color="secondary">Advanced</Tag> : undefined}
          problem={problem || undefined}
          actions={actions ? sampleActions(busy) : undefined}
        />
      </SettingsSection>
    </Box>
  );
};

const EveryKind = (props: { compact?: boolean; readOnly?: boolean }) => {
  const { compact, readOnly } = props;
  return (
    <Box className="story-column">
      <SettingsSection id="every-kind" rows={everyKind(useSampleSettings())} compact={compact} readOnly={readOnly} />
    </Box>
  );
};

const ARGS: Partial<RowArgs> = { kind: 'segmented', compact: false, readOnly: false, disabled: false, description: true, changed: true, badge: false, problem: '', actions: false, busy: false };

const ARG_TYPES: PlaygroundArgTypes<RowArgs> = {
  kind: { group: 'Content', control: 'select', options: [...KIND_ORDER], description: 'The input the row draws on the right.' },
  description: { group: 'Content', control: 'boolean' },
  badge: { group: 'Content', control: 'boolean', description: 'A Tag after the title, such as Advanced.' },
  problem: { group: 'Content', control: 'text', description: 'Shown under the row in the danger tone. Leave empty to hide.' },
  actions: { group: 'Content', control: 'boolean', description: 'Buttons after the control: Rebuild, and a danger Forget with a confirm step.' },
  changed: { group: 'State', control: 'boolean', description: 'A dot after the title and, with onReset, a reset button.' },
  busy: { group: 'State', control: 'boolean', description: 'With actions: the app is running Rebuild, so it sets loading and the button shows it is busy.' },
  compact: { group: 'Appearance', control: 'boolean', description: 'One line, at least 40 px tall: the description moves to a tooltip on the title, hints to a bubble under the control, and radio options drop their subtitles.' },
  readOnly: { group: 'State', control: 'boolean', description: 'The value as text. Pointing at it puts the hint of the current value in place of the description.' },
  disabled: { group: 'State', control: 'boolean' },
};

const meta = {
  title: 'Composites · Settings/SettingsRow',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<RowArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <KindDemo {...args} />,
} satisfies PlaygroundStory<RowArgs>;

const Kinds = {
  name: 'Every input kind',
  render: () => <EveryKind />,
} satisfies StoryLiteStoryDefinition<RowArgs>;

const Compact = {
  name: 'Every input kind, compact',
  render: () => <EveryKind compact />,
} satisfies StoryLiteStoryDefinition<RowArgs>;

const ReadOnly = {
  name: 'Every input kind, read only',
  render: () => <EveryKind readOnly />,
} satisfies StoryLiteStoryDefinition<RowArgs>;

const Marks = {
  name: 'Changed, reset, badge, problem, actions and a folded description',
  render: () => <RowMarksDemo />,
} satisfies StoryLiteStoryDefinition<RowArgs>;

const MarksCompact = {
  name: 'Changed, reset, badge, problem and actions, compact',
  render: () => <RowMarksDemo compact />,
} satisfies StoryLiteStoryDefinition<RowArgs>;

const Busy = {
  name: 'An action at work',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <KindDemo {...args} kind="select" actions busy />,
} satisfies PlaygroundStory<RowArgs>;

const ChoiceFit = {
  name: 'A long choice in a narrow row',
  render: () => <ChoiceFitDemo />,
} satisfies StoryLiteStoryDefinition<RowArgs>;

const ChoiceFitCompact = {
  name: 'A long choice in a narrow row, compact',
  render: () => <ChoiceFitDemo compact />,
} satisfies StoryLiteStoryDefinition<RowArgs>;

const StateRow = (props: StateProps) => {
  const row = rowOfKind(useSampleSettings(), 'segmented');
  if (row === undefined) return null;
  return (
    <SettingsSection>
      <SettingsRow {...row} disabled={props.disabled === true} readOnly={props.readOnly === true} compact={props.compact === true} flash={props.flash === true} changed={props.changed === true} onReset={() => undefined} />
    </SettingsSection>
  );
};

const CODE = `import { SettingsRow } from '@drizztdourden08/tessera';

<SettingsRow
  id="channels"
  title="Channels"
  description="How many speakers the sound goes to."
  hint="Pick Mono for a single earbud."
  input={{
    kind: 'segmented',
    value: channels,
    onChange: setChannels,
    options: [
      { value: '1', label: 'Mono', hint: 'Folds the output to one channel.' },
      { value: '2', label: 'Stereo', hint: 'Keeps left and right apart.' },
    ],
  }}
/>`;

const Overview = overviewStory({
  component: 'SettingsRow',
  description: 'One setting: its title, a line under it, and the input on the right.',
  points: [
    'The input is data: a `kind` such as `toggle`, `select` or `slider`, its props, `value` and `onChange`.',
    '**It never changes height:** the hint line under the description keeps room for every hint it can show.',
    '`changed` adds a dot and, with `onReset`, a reset button; `badge` sits after the title, `problem` under the row.',
    '`actions` puts buttons after the control, or in its place, each `loading` while the app runs it.',
    '`compact` draws one line; `readOnly` draws the value as text; `descriptionLines` folds the description.',
    'Rows sit in a [SettingsSection], which draws the box, counts the changed rows and holds the `lock`.',
  ],
  playground: Playground,
  variants: [Kinds, Compact, ReadOnly, Marks, MarksCompact, Busy, ChoiceFit, ChoiceFitCompact],
  states: {
    render: (props) => <StateRow {...props} />,
    list: [
      STATE.idle,
      { name: 'Compact', props: { compact: true } },
      STATE.readOnly,
      STATE.disabled,
      { name: 'Changed', props: { changed: true } },
      { name: 'Search hit', props: { flash: true } },
    ],
  },
  code: CODE,
});

export default meta;
export { Busy, ChoiceFit, ChoiceFitCompact, Compact, Kinds, Marks, MarksCompact, Overview, Playground, ReadOnly };
