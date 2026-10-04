/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { NamedRangeDemo } from './_samples/NamedRangeDemo';
import type { NamedRangeDemoProps } from './_samples/option-demos.type';
import './NamedRange.stories.css';

type NamedRangeArgs = {
  value: number;
  showValues: boolean;
  disabled: boolean;
};

const ARG_TYPES: PlaygroundArgTypes<NamedRangeArgs> = {
  value: { group: 'Value', control: 'number', description: 'From 0 to 99: 0, 50 and 99 pick a name, any other number opens Custom.' },
  showValues: { group: 'Content', control: 'boolean', description: 'Write each value after its name, such as Normal (50).' },
  disabled: { group: 'State', control: 'boolean' },
};

const meta = {
  title: 'Primitives · Inputs/NamedRange',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<NamedRangeArgs>;

const Playground = {
  name: 'Playground',
  args: { value: 65, showValues: true, disabled: false },
  argTypes: ARG_TYPES,
  render: (args) => <NamedRangeDemo key={args.value} start={args.value} showValues={args.showValues} disabled={args.disabled} />,
} satisfies PlaygroundStory<NamedRangeArgs>;

const PICKS = { 'a named value': 50, 'a value of its own': 65 } as const;

const Picks = {
  name: 'Progression balancing: a named value, or Custom with a number',
  render: () => <Demonstrator rows={axis(Object.keys(PICKS) as (keyof typeof PICKS)[])} cell={(pick) => <NamedRangeDemo start={PICKS[pick]} />} />,
} satisfies StoryLiteStoryDefinition<NamedRangeArgs>;

const CODE = `import { NamedRange } from '@drizztdourden08/tessera';

<NamedRange
  value={balancing}
  onChange={setBalancing}
  names={[{ label: 'Disabled', value: 0 }, { label: 'Normal', value: 50 }, { label: 'Extreme', value: 99 }]}
  min={0}
  max={99}
/>`;

const Overview = overviewStory({
  component: 'NamedRange',
  description: 'A number from a range whose common values have names: the names first, then Custom for any other number.',
  points: [
    '`names` become joined buttons, each with its value, such as Normal (50); a pick sets that value.',
    'Custom opens a [NumberStepper] held between `min` and `max`, with the range written beside it.',
    'A value that matches no name opens on Custom; `showValues` leaves the numbers off the names.',
  ],
  instead: '[Slider] for a range with no named values, or [SegmentedControl] when only the names are allowed.',
  playground: Playground,
  variants: [Picks],
  states: {
    render: (props: StateProps) => <NamedRangeDemo start={50} {...(props as Partial<NamedRangeDemoProps>)} />,
    list: [STATE.idle, { name: 'Custom', props: { start: 65 } }, STATE.disabled],
  },
  code: CODE,
});

export default meta;
export { Overview, Picks, Playground };
