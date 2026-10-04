/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Box, Stepper } from '../../src/primitives';
import type { StepperOrientation, StepperTone } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import { STEPPER_STEPS, stepIdAt, stepperSteps } from './_samples/stepper-data';
import { StepperDriver } from './_samples/StepperDriver';
import './Stepper.stories.css';

type StepperArgs = {
  orientation: StepperOrientation;
  compact: boolean;
  step: number;
  summaries: boolean;
  subSteps: boolean;
  error: boolean;
  doneIcon: 'check' | 'per step' | 'numbers';
  colour: StepperTone | 'per step';
};

const COLOURS: readonly StepperArgs['colour'][] = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'info', 'teal', 'violet', 'per step'];

const ARGS: Partial<StepperArgs> = { orientation: 'horizontal', compact: false, step: 3, summaries: true, subSteps: true, error: false, doneIcon: 'check', colour: 'primary' };

const ARG_TYPES: PlaygroundArgTypes<StepperArgs> = {
  summaries: { group: 'Content', control: 'boolean', description: 'What was chosen, under each done step.' },
  subSteps: { group: 'Content', control: 'boolean', description: 'The option tabs of Randomizer options.' },
  compact: { group: 'Appearance', control: 'boolean', description: 'Step 3 of 6 and a bar.' },
  doneIcon: { group: 'Appearance', control: 'select', options: ['check', 'per step', 'numbers'], description: 'What a done circle shows. The number flips over to the icon.' },
  colour: { group: 'Appearance', control: 'select', options: COLOURS, description: 'The fill, border, glow and arriving line of each step.' },
  orientation: { group: 'Layout', control: 'select', options: ['horizontal', 'vertical'] },
  step: { group: 'State', control: 'select', options: STEPPER_STEPS.map((_, index) => index + 1), description: 'The current step, from 1. Change it to watch the sequence.' },
  error: { group: 'State', control: 'boolean', description: 'Mode needs attention.' },
};

const meta = {
  title: 'Primitives · Navigation/Stepper',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<StepperArgs>;

const before = (at: number) => (id: string) => STEPPER_STEPS.findIndex((step) => step.id === id) < at;

const strip = (args: StepperArgs) => {
  const at = Math.max(args.step - 1, 0);
  const look = {
    summaries: args.summaries, subSteps: args.subSteps, long: args.orientation === 'vertical', errorAt: args.error ? 'mode' : undefined,
    tones: args.colour === 'per step', icons: args.doneIcon === 'per step',
  };
  const stepper = (
    <Stepper
      steps={stepperSteps(look, at)}
      currentId={stepIdAt(at)}
      orientation={args.orientation}
      compact={args.compact}
      tone={args.colour === 'per step' ? undefined : args.colour}
      doneIcon={args.doneIcon === 'numbers' ? false : 'check'}
      canSelect={before(at)}
      onSelect={() => undefined}
      onSubStepSelect={() => undefined}
      activeSubStepId="dungeon"
    />
  );
  return <Box className={args.orientation === 'vertical' ? 'stepper-story__rail' : 'stepper-story__wide'}>{stepper}</Box>;
};

const flat: StepperArgs = { orientation: 'horizontal', compact: false, step: 1, summaries: false, subSteps: false, error: false, doneIcon: 'check', colour: 'primary' };

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => strip(args),
} satisfies PlaygroundStory<StepperArgs>;

const StepByStep = {
  name: 'Step by step',
  render: () => <StepperDriver />,
} satisfies StoryLiteStoryDefinition<StepperArgs>;

const PLACES = ['Step 1', 'Step 3', 'Step 6'] as const;

const placeOf = (place: string) => Number.parseInt(place.replace('Step ', ''), 10);

const Horizontal = {
  name: 'Steps on top',
  render: () => <Demonstrator rows={axis(PLACES)} align="stretch" cell={(place) => strip({ ...flat, step: placeOf(place) })} />,
} satisfies StoryLiteStoryDefinition<StepperArgs>;

const LOOKS = ['Summaries', 'Sub-steps', 'A step needs attention'] as const;

const SubStepsOnTop = {
  name: 'Steps on top, with more',
  render: () => (
    <Demonstrator
      rows={axis(LOOKS)}
      align="stretch"
      cell={(look) => strip({ ...flat, step: 4, summaries: look === 'Summaries', subSteps: look === 'Sub-steps', error: look === 'A step needs attention' })}
    />
  ),
} satisfies StoryLiteStoryDefinition<StepperArgs>;

const Vertical = {
  name: 'Steps on the left',
  render: () => (
    <Demonstrator
      columns={axis(LOOKS)}
      valign="start"
      cell={(_row, look) => strip({
        ...flat, orientation: 'vertical', step: 4, summaries: true, subSteps: look === 'Sub-steps', error: look === 'A step needs attention',
      })}
    />
  ),
} satisfies StoryLiteStoryDefinition<StepperArgs>;

const Compact = {
  name: 'Compact, for tight spaces',
  render: () => (
    <Demonstrator
      rows={axis(PLACES)}
      align="stretch"
      cell={(place) => <Box className="stepper-story__compact">{strip({ ...flat, compact: true, step: placeOf(place) })}</Box>}
    />
  ),
} satisfies StoryLiteStoryDefinition<StepperArgs>;

const FACES: Readonly<Record<string, Partial<StepperArgs>>> = {
  'A check, the default': {},
  'An icon per step': { doneIcon: 'per step' },
  'Numbers kept': { doneIcon: 'numbers' },
  'A colour per step': { colour: 'per step', doneIcon: 'per step' },
  'Secondary for every step': { colour: 'secondary' },
};

const IconsAndColours = {
  name: 'Done icons and colours',
  render: () => (
    <Demonstrator rows={axis(Object.keys(FACES))} align="stretch" cell={(face) => strip({ ...flat, step: 4, ...FACES[face] })} />
  ),
} satisfies StoryLiteStoryDefinition<StepperArgs>;

const DONE_STEP = '.stepper__item[data-status="done"] .stepper__step';

const CODE = `import { Stepper } from '@drizztdourden08/tessera';

<Stepper
  steps={[{ id: 'basics', label: 'Basics', summary: 'Hyrule practice' }, { id: 'mode', label: 'Mode', doneIcon: 'gamepad-2' }, { id: 'review', label: 'Review', tone: 'success' }]}
  currentId="mode"
  doneIcon="check"
  canSelect={(id) => id === 'basics'}
  onSelect={goTo}
/>`;

const Overview = overviewStory({
  component: 'Stepper',
  description: 'The steps of a task in order: a numbered circle per step, joined by lines, with the label under it, or beside it when the steps run down the left. Each step forward plays one sequence: the circle fills from the side the line leaves, the line runs to the next circle, the colour reaches that circle where the line meets it and spreads both ways round its border until the two ends meet, then the current circle glows and breathes. A jump over several steps fills every circle it passes and spreads their borders together, draws the lines in one sweep, then spreads the border of the step it lands on. Going back plays the forward sequence in exact reverse, a little faster, once per step. A done circle flips its number over to a check, or to an icon of your choice per step, or keeps the number when doneIcon is false. Every step can take its own colour, from the Tessera tones or the tag colours: it colours the fill, the border, the glow and the line arriving at it. Reduced motion shows the end state at once. Done and current circles glow. A step can show what was chosen under its label, sub-steps with a count under the line that follows it, and an error state. Only steps the host allows can be clicked, and the current step carries aria-current. The compact form is Step 2 of 5 with a ProgressBar. Not to be confused with NumberStepper, the number input.',
  playground: Playground,
  variants: [StepByStep, Horizontal, SubStepsOnTop, Vertical, IconsAndColours, Compact],
  states: {
    render: () => strip({ ...flat, step: 3 }),
    list: [
      STATE.idle,
      { ...STATE.hover, target: DONE_STEP },
      { ...STATE.focus, target: DONE_STEP },
    ],
  },
  code: CODE,
});

export default meta;
export { Compact, Horizontal, IconsAndColours, Overview, Playground, StepByStep, SubStepsOnTop, Vertical };
