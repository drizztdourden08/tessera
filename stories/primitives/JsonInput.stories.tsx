/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { JsonShape } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { JsonInputDemo } from './_samples/JsonInputDemo';
import type { JsonInputDemoProps } from './_samples/JsonInputDemo.type';
import { BROKEN, BROKEN_CASES, PLANDO } from './_samples/option-samples.constants';
import './JsonInput.stories.css';

type JsonInputArgs = {
  shape: JsonShape;
  broken: boolean;
  readOnly: boolean;
  disabled: boolean;
};

const ARGS: Partial<JsonInputArgs> = { shape: 'object', broken: false, readOnly: false, disabled: false };

const ARG_TYPES: PlaygroundArgTypes<JsonInputArgs> = {
  shape: { group: 'Behaviour', control: 'select', options: ['object', 'array', 'any'], description: 'What the value must be: an object, a list or any JSON.' },
  broken: { group: 'State', control: 'boolean', description: 'Start from text with a missing comma, as defaultText.' },
  readOnly: { group: 'State', control: 'boolean' },
  disabled: { group: 'State', control: 'boolean' },
};

const meta = {
  title: 'Primitives · Inputs/JsonInput',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<JsonInputArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <JsonInputDemo key={`${args.shape}-${String(args.broken)}`} start={PLANDO} shape={args.shape} defaultText={args.broken ? BROKEN : undefined} readOnly={args.readOnly} disabled={args.disabled} />
  ),
} satisfies PlaygroundStory<JsonInputArgs>;

const Valid = {
  name: 'Plando texts: a valid object, Format tidies it',
  render: () => <JsonInputDemo start={PLANDO} shape="object" defaultText={'{"uncle_leaving_text": "Have fun, Bram",\n  "ganon_phase_3_alt":"Got wax in your ears?"}'} />,
} satisfies StoryLiteStoryDefinition<JsonInputArgs>;

const Broken = {
  name: 'The same while the JSON does not parse: the saved value stays',
  render: () => <JsonInputDemo start={PLANDO} shape="object" defaultText={BROKEN} />,
} satisfies StoryLiteStoryDefinition<JsonInputArgs>;

const Problems = {
  name: 'What each problem says, with its line and column',
  render: () => (
    <Demonstrator
      rows={axis(Object.keys(BROKEN_CASES))}
      align="stretch"
      cell={(name) => <JsonInputDemo start={{}} shape="object" defaultText={BROKEN_CASES[name]} />}
    />
  ),
} satisfies StoryLiteStoryDefinition<JsonInputArgs>;

const CODE = `import { JsonInput } from '@drizztdourden08/tessera';

<JsonInput
  value={option.value}
  onChange={(value) => setOption(value)}
  onProblem={(problem) => setBlocked(problem !== null)}
  shape="object"
/>`;

const Overview = overviewStory({
  component: 'JsonInput',
  description: 'JSON typed over the code highlighting of [CodeBlock], checked as the user types, with Format.',
  points: [
    'Each change is checked; `onChange` gets the parsed value only while the text is valid JSON.',
    'A problem marks the field, tints its line and says what is wrong with its line and column.',
    '`shape` asks for an `object` or an `array`; `onProblem` tells a form to hold its Save.',
    'Format rewrites valid text with `indent` spaces; it is off while the text does not parse.',
    'The field grows with its text and wraps long lines; `defaultText` starts from a saved draft.',
  ],
  instead: '[KeyValueEditor] for a map of names to numbers or words, where a typo cannot break the value.',
  playground: Playground,
  variants: [Valid, Broken, Problems],
  states: {
    render: (props: StateProps) => <JsonInputDemo start={PLANDO} {...(props as Partial<JsonInputDemoProps>)} />,
    list: [
      STATE.idle,
      { name: 'Focus', pseudo: 'focus-within', target: '.json-input__editor' },
      { name: 'Error', props: { defaultText: BROKEN } },
      STATE.readOnly,
      STATE.disabled,
    ],
  },
  code: CODE,
});

export default meta;
export { Broken, Overview, Playground, Problems, Valid };
