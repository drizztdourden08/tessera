/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, Checkbox, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { axis, VariantGrid } from '../_template/VariantGrid';

type CheckboxArgs = {
  label: string;
  disabled: boolean;
  indeterminate: boolean;
};

const GAMES = ['A Link to the Past', "Link's Awakening", 'Ocarina of Time'] as const;

const ARGS: Partial<CheckboxArgs> = { label: 'Show hints on the map', disabled: false, indeterminate: false };

const ARG_TYPES: StoryLiteArgTypes<CheckboxArgs> = {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
  };

const meta = {
  title: 'Primitives · Inputs/Checkbox',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<CheckboxArgs>;

const StatefulCheckbox = (props: { initial: boolean; ariaLabel?: string } & Partial<CheckboxArgs>) => {
  const { initial, label, ariaLabel, disabled, indeterminate } = props;
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
} satisfies StoryLiteStoryDefinition<CheckboxArgs>;

const VALUES = ['unchecked', 'checked', 'indeterminate'] as const;
const FORMS = ['enabled', 'disabled', 'no label'] as const;

const LiveCheckbox = (props: { value: (typeof VALUES)[number]; form: (typeof FORMS)[number] }) => {
  const { value, form } = props;
  const [checked, setChecked] = useState(value === 'checked');
  const bare = form === 'no label';
  return (
    <Checkbox
      checked={checked}
      onChange={setChecked}
      indeterminate={value === 'indeterminate'}
      disabled={form === 'disabled'}
      label={bare ? undefined : 'Show hints'}
      ariaLabel={bare ? 'Show hints' : undefined}
    />
  );
};

const States = {
  name: 'States',
  render: () => (
    <VariantGrid
      rows={axis(VALUES)}
      columns={axis(FORMS)}
      cell={(value, form) => <LiveCheckbox value={value} form={form} />}
    />
  ),
} satisfies StoryLiteStoryDefinition<CheckboxArgs>;

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
  description: 'A box for one on or off choice in a list or a form, with its label beside it. It is controlled: checked comes in and onChange hands back the new value. Indeterminate draws the mixed state for a box that stands for a partly checked set, disabled dims it, and ariaLabel names a box whose label is drawn somewhere else.',
  playground: Playground,
  variants: [States],
  code: CODE,
});

export default meta;
export { Overview, Playground, SelectAll, States };
