/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, TagPicker } from '../../src/primitives';
import type { TagPickerGroup } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { ValueReadout } from '../_template/ValueReadout';

type TagPickerArgs = {
  label: string;
  single: boolean;
  disabled: boolean;
};

const GAME_GROUPS: TagPickerGroup[] = [
  {
    id: 'zelda',
    label: 'Zelda',
    options: [
      { value: 'alttp', label: 'A Link to the Past' },
      { value: 'la', label: "Link's Awakening" },
      { value: 'oot', label: 'Ocarina of Time' },
    ],
  },
  {
    id: 'other',
    label: 'Other games',
    options: [
      { value: 'sm', label: 'Super Metroid' },
      { value: 'smw', label: 'Super Mario World' },
      { value: 'pkmn', label: 'Pokemon Red' },
    ],
  },
];

const GOALS: TagPickerGroup[] = [
  {
    id: 'goals',
    options: [
      { value: 'ganon', label: 'Defeat Ganon' },
      { value: 'triforce', label: 'Triforce hunt' },
      { value: 'pedestal', label: 'Pedestal' },
      { value: 'dungeons', label: 'All dungeons' },
    ],
  },
];

const ARGS: Partial<TagPickerArgs> = { label: 'Games in the multiworld', single: false, disabled: false };

const ARG_TYPES: StoryLiteArgTypes<TagPickerArgs> = {
    label: { control: 'text' },
    single: { control: 'boolean', description: 'One pick at a time, the tags act as radios.' },
    disabled: { control: 'boolean' },
  };

const meta = {
  title: 'Primitives · Inputs/TagPicker',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<TagPickerArgs>;

type StatefulPickerProps = { initial: string[]; groups: TagPickerGroup[] } & Partial<TagPickerArgs>;

const StatefulPicker = (props: StatefulPickerProps) => {
  const { initial, groups, label, single, disabled } = props;
  const [value, setValue] = useState(initial);
  return (
    <ValueReadout value={value}>
      <TagPicker value={value} groups={groups} onChange={setValue} label={label} single={single} disabled={disabled} />
    </ValueReadout>
  );
};

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <StatefulPicker initial={['alttp', 'sm']} groups={GAME_GROUPS} {...args} />,
} satisfies StoryLiteStoryDefinition<TagPickerArgs>;

const Layouts = {
  name: 'Layouts',
  render: () => (
    <Box className="story-column">
      <StatefulPicker initial={[]} groups={GAME_GROUPS} label="Grouped, nothing picked" />
      <StatefulPicker initial={['ganon', 'dungeons']} groups={GOALS} label="One flat set, several picks" />
      <StatefulPicker initial={['triforce']} groups={GOALS} label="Single pick" single />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<TagPickerArgs>;

const Goals = (props: { initial: string[]; disabled: boolean }) => {
  const { initial, disabled } = props;
  const [value, setValue] = useState(initial);
  return <TagPicker value={value} groups={GOALS} onChange={setValue} disabled={disabled} />;
};

const renderState = (props: StateProps) => (
  <Goals initial={props.selected === true ? ['ganon', 'dungeons'] : []} disabled={props.disabled === true} />
);

const Overview = overviewStory({
  component: 'TagPicker',
  description: 'A set of Tags to switch on and off, for picking from a short, known list of options. Options can sit in labelled groups, or in one flat set with no heading. Each click adds or removes a value, and single turns the tags into radios that hold at most one pick. The value is an array either way, and the whole picker can be disabled.',
  playground: Playground,
  variants: [Layouts],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      { ...STATE.hover, target: '.tag-chip' },
      { ...STATE.focus, target: '.tag-chip' },
      STATE.selected,
      { ...STATE.disabled, props: { selected: true, disabled: true } },
    ],
  },
  code: `import { useState } from 'react';
import { TagPicker } from '@drizztdourden08/tessera';

const GOALS = [{
  id: 'goals',
  options: [
    { value: 'ganon', label: 'Defeat Ganon' },
    { value: 'triforce', label: 'Triforce hunt' },
  ],
}];

const [goals, setGoals] = useState(['ganon']);

<TagPicker label="Goals" groups={GOALS} value={goals} onChange={setGoals} />`,
});

export default meta;
export { Layouts, Overview, Playground };
