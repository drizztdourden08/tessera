/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { DynamicInput, parsePattern } from '../../src/composites';
import { Code, Field } from '../../src/primitives';
import { axis } from '../_template/axis';
import { SIZE_ARG } from '../_template/control-sizes.constants';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { sizesStory } from '../_template/sizes-story';
import { STATE } from '../_template/states/states.constants';
import { ARG_ROWS, PROP_ROWS, SYNTAX_ROWS, TYPE_ROWS } from './_samples/pattern-docs.constants';
import { PATTERN_EXAMPLES, PLAYGROUND_PATTERN } from './_samples/pattern-data';
import { PatternDocTable } from './_samples/PatternDocTable';
import { PatternExampleField } from './_samples/PatternExampleField';
import { PatternKeys } from './_samples/PatternKeys';
import { PatternPlayground } from './_samples/PatternPlayground';
import type { PatternPlaygroundArgs } from './_samples/PatternPlayground';
import type { StateProps } from '../_template/states/states.type';
import './DynamicInput.stories.css';

type Story = StoryLiteStoryDefinition<PatternPlaygroundArgs>;

const ARGS: Partial<PatternPlaygroundArgs> = {
  pattern: PLAYGROUND_PATTERN, label: 'Randomizer seed', counter: '', size: 'md', disabled: false, invalid: false,
};

const ARG_TYPES: PlaygroundArgTypes<PatternPlaygroundArgs> = {
  pattern: { group: 'Content', control: 'text', description: 'Type a pattern and the field rebuilds. Lists countries and months, actions send and reroll, and the wallet and dices icons are on hand.' },
  label: { group: 'Content', control: 'text' },
  counter: {
    group: 'Content',
    control: 'select',
    options: (args) => ['', ...parsePattern(args.pattern).slots.filter((slot) => slot.type === 'text').map((slot) => slot.name)],
    description: 'A text slot of the pattern to count. The list follows the pattern.',
  },
  size: SIZE_ARG,
  disabled: { group: 'State', control: 'boolean' },
  invalid: { group: 'State', control: 'boolean', description: 'Sets an error on the Field around it.' },
};

const meta = {
  title: 'Composites · Inputs/DynamicInput',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<PatternPlaygroundArgs>;

const EXAMPLE_KEYS = PATTERN_EXAMPLES.map((example) => example.key);

const exampleOf = (key: string) => PATTERN_EXAMPLES.find((example) => example.key === key) ?? PATTERN_EXAMPLES[0];

const PatternExampleCode = (props: { pattern: string }) => <Code className="pattern-story__pattern">{props.pattern}</Code>;

const Examples = {
  name: 'Ten fields',
  render: () => (
    <Demonstrator
      corner="Field"
      rows={axis(EXAMPLE_KEYS)}
      columns={[{ key: 'live', label: 'Try it', fill: true }, { key: 'pattern', label: 'Pattern' }]}
      align="stretch"
      cell={(key, column) => {
        const example = exampleOf(key);
        if (example === undefined) return null;
        return column === 'live' ? <PatternExampleField example={example} /> : <PatternExampleCode pattern={example.pattern} />;
      }}
    />
  ),
} satisfies Story;

const Sizes = sizesStory<PatternPlaygroundArgs>((size) => {
  const example = exampleOf('Time');
  return example === undefined ? null : <PatternExampleField example={example} size={size} readout={false} />;
}, { align: 'stretch' });

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <PatternPlayground {...args} />,
} satisfies PlaygroundStory<PatternPlaygroundArgs>;

const StateDemo = (props: StateProps & { error?: string }) => {
  const { disabled, error } = props;
  const [value, setValue] = useState({ hh: 12, mm: 30, ampm: 'AM' } as const);
  return (
    <Field label="Delivery time" error={error}>
      <DynamicInput pattern={exampleOf('Time')?.pattern ?? ''} value={value} onChange={(next) => setValue(next as typeof value)} disabled={disabled === true} />
    </Field>
  );
};

const CODE = `import { useState } from 'react';
import { DynamicInput, Field } from '@drizztdourden08/tessera';

const [time, setTime] = useState({ hh: 12, mm: 30, ampm: 'AM' });

<Field label="Delivery time">
  <DynamicInput
    pattern="[icon:clock] {hh:hour 12h}:{mm:minute step5} {ampm:choice AM|PM muted}"
    value={time}
    onChange={setTime}
  />
</Field>`;

const Overview = overviewStory({
  component: 'DynamicInput',
  description: 'One field built from a pattern of typed slots, muted text and icons, such as a time or a price with its currency.',
  points: [
    'Write slots in braces, such as `{hh:hour 12h}`; the value is one object keyed by slot name.',
    'Typing fills a slot, and a full slot moves on to the next.',
    'The slot in focus opens the control its type calls for, such as a [NumberStepper] or a [ColorPicker].',
    '[[Tab]] and [[Shift+Tab]] move between slots, and [[Backspace]] in an empty slot goes back.',
    '**A bad pattern never throws:** the part it cannot read shows as text, with a warning.',
    'Put it in a [Field] for its label, hint, error and size.',
  ],
  playground: Playground,
  variants: [Examples, Sizes],
  sections: [
    { title: 'Pattern syntax', node: <PatternDocTable corner="Part" columns={['Write', 'Means']} rows={SYNTAX_ROWS} /> },
    { title: 'Slot types', node: <PatternDocTable corner="Type" columns={['Example', 'Value', 'Typing', 'Popover']} rows={TYPE_ROWS} /> },
    { title: 'Slot arguments', node: <PatternDocTable corner="Argument" columns={['Write', 'Types', 'Means']} rows={ARG_ROWS} /> },
    { title: 'Keyboard', node: <PatternKeys /> },
    { title: 'Props', node: <PatternDocTable corner="Prop" columns={['Shape', 'Use']} rows={PROP_ROWS} /> },
  ],
  states: {
    render: (props) => <StateDemo {...props} />,
    list: [
      STATE.idle,
      { ...STATE.hover, target: '.dynamic-input__surface' },
      { ...STATE.focus, target: '.dynamic-input__surface' },
      { ...STATE.error, render: () => <StateDemo error="Deliveries start at 8 AM." /> },
      STATE.disabled,
    ],
  },
  code: CODE,
});

export default meta;
export { Examples, Overview, Playground, Sizes };
