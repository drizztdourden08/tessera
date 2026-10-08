/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { SIZE_ARG } from '../_template/control-sizes.constants';
import { sizesStory } from '../_template/sizes-story';
import { Box, Checkbox, Field, Text, type ControlSize } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';

type CheckboxArgs = {
  label: string;
  disabled: boolean;
  indeterminate: boolean;
  size: ControlSize;
};

const GAMES = ['A Link to the Past', "Link's Awakening", 'Ocarina of Time'] as const;

const ARGS: Partial<CheckboxArgs> = { label: 'Show hints on the map', disabled: false, indeterminate: false, size: 'md' };

const ARG_TYPES: PlaygroundArgTypes<CheckboxArgs> = {
    label: { group: 'Content', control: 'text' },
    disabled: { group: 'State', control: 'boolean' },
    indeterminate: { group: 'State', control: 'boolean' },
    size: SIZE_ARG,
  };

const meta = {
  title: 'Primitives · Inputs/Checkbox',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<CheckboxArgs>;

const StatefulCheckbox = (props: { initial: boolean; ariaLabel?: string } & Partial<CheckboxArgs>) => {
  const { initial, label, ariaLabel, disabled, indeterminate, size } = props;
  const [checked, setChecked] = useState(initial);
  return (
    <Box className="story-row">
      <Checkbox
        checked={checked}
        onChange={setChecked}
        label={label}
        ariaLabel={ariaLabel}
        disabled={disabled}
        indeterminate={indeterminate}
        size={size}
      />
      <Text className="story-label">{checked ? 'checked' : 'unchecked'}</Text>
    </Box>
  );
};

const GamePicker = () => {
  const [picked, setPicked] = useState<readonly string[]>([GAMES[0]]);
  const all = picked.length === GAMES.length;
  const toggle = (game: string, on: boolean) =>
    setPicked(on ? [...picked, game] : picked.filter((g) => g !== game));
  return (
    <Box className="story-column">
      <Checkbox
        checked={all}
        indeterminate={picked.length > 0 && !all}
        onChange={(on) => setPicked(on ? [...GAMES] : [])}
        label="All games"
      />
      {GAMES.map((game) => (
        <Checkbox key={game} checked={picked.includes(game)} onChange={(on) => toggle(game, on)} label={game} />
      ))}
      <Text className="story-label">Picked: {picked.length === 0 ? 'none' : picked.join(', ')}</Text>
    </Box>
  );
};

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <StatefulCheckbox initial {...args} />,
} satisfies PlaygroundStory<CheckboxArgs>;

const Labels = {
  name: 'Labels',
  render: () => (
    <Box className="story-column">
      <StatefulCheckbox initial label="Show hints on the map" />
      <StatefulCheckbox initial ariaLabel="Show hints on the map" />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<CheckboxArgs>;

const Sizes = sizesStory<CheckboxArgs>((size) => <StatefulCheckbox initial size={size} label="Show hints on the map" />);

const HintsOption = (props: { initial: boolean; indeterminate?: boolean; disabled?: boolean }) => {
  const { initial, indeterminate, disabled } = props;
  const [checked, setChecked] = useState(initial);
  return <Checkbox checked={checked} onChange={setChecked} indeterminate={indeterminate} disabled={disabled} label="Show hints on the map" />;
};

const renderState = (props: StateProps) => (
  <HintsOption initial={props.checked === true} indeterminate={props.indeterminate === true} disabled={props.disabled === true} />
);

const renderError = () => (
  <Field error="A race seed needs hints on the map.">
    <HintsOption initial={false} />
  </Field>
);

const SelectAll = {
  name: 'Select all (mixed state)',
  render: () => <GamePicker />,
} satisfies StoryLiteStoryDefinition<CheckboxArgs>;

const CODE = `import { useState } from 'react';
import { Checkbox } from '@drizztdourden08/tessera';

const HintsOption = () => {
  const [checked, setChecked] = useState(true);
  return <Checkbox checked={checked} onChange={setChecked} label="Show hints on the map" />;
};`;

const Overview = overviewStory({
  component: 'Checkbox',
  description: 'A box for one on or off choice in a list or a form, with its label beside it.',
  points: [
    'It is controlled: `checked` comes in and `onChange` hands back the new value.',
    '`indeterminate` draws the mixed state, for a box that stands for a partly checked set.',
    '`ariaLabel` names a box whose label is drawn somewhere else.',
    '`md` sits beside standard controls; `sm` is for dense lists and tables.',
  ],
  instead: '[Toggle] for a setting that takes effect at once.',
  playground: Playground,
  variants: [Labels, Sizes],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      STATE.hover,
      { ...STATE.focus, target: '.checkbox__input' },
      STATE.checked,
      { name: 'Indeterminate', props: { indeterminate: true } },
      { ...STATE.error, render: renderError },
      STATE.disabled,
    ],
  },
  code: CODE,
});

export default meta;
export { Labels, Overview, Playground, SelectAll, Sizes };
