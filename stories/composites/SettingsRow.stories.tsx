/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { SettingsRow, SettingsSection } from '../../src/composites';
import type { SettingsDescription, SettingsInputKind } from '../../src/composites';
import { Box } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { ChoiceFitDemo } from './_samples/ChoiceFitDemo';
import { everyKind, KIND_ORDER, rowOfKind } from './_samples/every-kind';
import { useSampleSettings } from './_samples/settings-sample-state';

type RowArgs = {
  kind: SettingsInputKind;
  compact: boolean;
  readOnly: boolean;
  disabled: boolean;
  description: boolean;
};

const KindDemo = (props: RowArgs) => {
  const { kind, compact, readOnly, disabled, description } = props;
  const row = rowOfKind(useSampleSettings(), kind);
  if (row === undefined) return null;
  const text: SettingsDescription = description ? { description: row.description ?? 'What this setting changes, in one line.' } : { noDescription: true };
  return (
    <Box className="story-column">
      <SettingsSection>
        <SettingsRow id={row.id} title={row.title} hint={row.hint} input={row.input} {...text} compact={compact} readOnly={readOnly} disabled={disabled} />
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

const ARGS: Partial<RowArgs> = { kind: 'segmented', compact: false, readOnly: false, disabled: false, description: true };

const ARG_TYPES: PlaygroundArgTypes<RowArgs> = {
  kind: { group: 'Content', control: 'select', options: [...KIND_ORDER], description: 'The input the row draws on the right.' },
  description: { group: 'Content', control: 'boolean' },
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
      <SettingsRow {...row} disabled={props.disabled === true} readOnly={props.readOnly === true} compact={props.compact === true} flash={props.flash === true} />
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
    'The line shows the description, or the hint of the part of the input _under the pointer_.',
    '**It never changes height:** the line keeps room for its longest hint.',
    '`compact` draws one line, the description in a tooltip; `readOnly` draws the value as text.',
    'A `segmented` choice too wide for its row turns into a [Select] with the same options and value.',
    'Rows sit in a [SettingsSection], which draws the box, the dividers and the shared `lock`.',
  ],
  playground: Playground,
  variants: [Kinds, Compact, ReadOnly, ChoiceFit, ChoiceFitCompact],
  states: {
    render: (props) => <StateRow {...props} />,
    list: [
      STATE.idle,
      { name: 'Compact', props: { compact: true } },
      STATE.readOnly,
      STATE.disabled,
      { name: 'Search hit', props: { flash: true } },
    ],
  },
  code: CODE,
});

export default meta;
export { ChoiceFit, ChoiceFitCompact, Compact, Kinds, Overview, Playground, ReadOnly };
