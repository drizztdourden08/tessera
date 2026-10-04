/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { SettingsRow, SettingsSection } from '../../src/composites';
import type { SettingsDescription, SettingsInputKind } from '../../src/composites';
import { Box } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
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
  description: 'One setting: its title, one line under it, and the input on the right. The input is data: a kind and its props, with the value and onChange. The kinds are toggle, select, segmented, radio, multi, slider, number, text, password, dynamic (a DynamicInput pattern), color, keybind, tags and custom. The line under the title is the description. While the pointer or the keyboard is on one part of the input, the hint of that part takes its place: a segment, a multi option, the option highlighted in an open select, the toggle with the hint of its state, the slider with the hint of its value as it moves. Leaving brings the description back. The row never changes height, because the line keeps room for its longest hint. Without a description the line rests on the hint of the current value, or on a prompt to point at an option. Options take a hint, a toggle takes hints for on and off, and a slider takes hintOf for its value. compact draws one line at least 40 px tall: the description moves to a tooltip on the title, hints to a bubble under the input, and radio options drop their subtitles; a slider, a select or a text input keeps at least 160 px. readOnly draws the value as text that reads well: On or Off, the option label, the slider value with its unit, keycaps, tags, a swatch with its code, the password masked.',
  points: [
    'Rows sit in a SettingsSection, which draws the sunken box and the dividers between them.',
    'Every row carries data-setting-key, so a search can find it and flash it.',
    'lock is read by the SettingsSection: rows next to each other that share a cause sit under one DisabledOverlay.',
    'The select reports the option it highlights through onActiveChange, which the row turns into the hint.',
    'The compact sizes are the --settings-row-compact-h and --settings-row-compact-control-w tokens.',
  ],
  playground: Playground,
  variants: [Kinds, Compact, ReadOnly],
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
export { Compact, Kinds, Overview, Playground, ReadOnly };
