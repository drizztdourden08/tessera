/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundStory } from '../_template/controls/playground.type';
import { Box, Stepper } from '../../src/primitives';
import type { StepperProps } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import { STEPPER_STEPS, ladderSteps, stepIdAt, stepperSteps } from './_samples/stepper-data';
import { ARGS, ARG_TYPES, flat } from './_samples/stepper-story-args';
import type { StepperArgs } from './_samples/stepper-story-args';
import { StepperDriver } from './_samples/StepperDriver';
import { StepperLadder } from './_samples/StepperLadder';
import './Stepper.stories.css';

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
      reserve={args.reserve}
      dotVariant={args.dotVariant}
      labelPlacement={args.labelPlacement}
      canSelect={before(at)}
      onSelect={() => undefined}
      onSubStepSelect={() => undefined}
      activeSubStepId="dungeon"
    />
  );
  return <Box className={args.orientation === 'vertical' ? 'stepper-story__rail' : 'stepper-story__wide'}>{stepper}</Box>;
};

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => strip(args),
} satisfies PlaygroundStory<StepperArgs>;

const StepByStep = {
  name: 'Step by step, on top',
  render: () => <StepperDriver orientation="horizontal" />,
} satisfies StoryLiteStoryDefinition<StepperArgs>;

const StepByStepLeft = {
  name: 'Step by step, on the left',
  render: () => <StepperDriver orientation="vertical" />,
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

const ROOMS: Readonly<Record<string, Partial<StepperArgs>>> = {
  'Room kept, step 1': { step: 1 },
  'Room kept, step 4': { step: 4 },
  'No room kept, step 1': { step: 1, reserve: 'none' },
  'No room kept, step 4': { step: 4, reserve: 'none' },
};

const Room = {
  name: 'Room for summaries',
  render: () => (
    <Demonstrator rows={axis(Object.keys(ROOMS))} align="stretch" cell={(room) => strip({ ...flat, summaries: true, ...ROOMS[room] })} />
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

const LADDER_LOOKS = ['Ring dots, steps 1, 3 and 4 lit', 'Filled dots', 'Grey', 'Name below, with pictures', 'Narrow box that scrolls'] as const;

const LIT_SOME: ReadonlySet<string> = new Set(['lamp', 'rupees-25', 'bee']);

const ladderProps = (look: (typeof LADDER_LOOKS)[number]): Partial<StepperProps> => {
  if (look === 'Filled dots') return { dotVariant: 'filled' };
  if (look === 'Grey') return { tone: 'neutral' };
  if (look === 'Name below, with pictures') return { labelPlacement: 'below' };
  return {};
};

const ladder = (look: (typeof LADDER_LOOKS)[number]) => {
  const stepper = (
    <Stepper
      steps={ladderSteps(LIT_SOME)}
      selectMode="toggle"
      labelPlacement="above"
      dotVariant="ring"
      tone="warning"
      reserve="none"
      stepWidth="sm"
      scroll
      onSelect={() => undefined}
      label="Steps to keep"
      {...ladderProps(look)}
    />
  );
  return <Box className={look === 'Narrow box that scrolls' ? 'stepper-story__narrow' : 'stepper-story__wide'}>{stepper}</Box>;
};

const LadderPick = {
  name: 'Ladder, pick the steps to keep',
  render: () => <StepperLadder />,
} satisfies StoryLiteStoryDefinition<StepperArgs>;

const LadderLooks = {
  name: 'Ladder looks',
  render: () => <Demonstrator rows={axis(LADDER_LOOKS)} align="stretch" cell={(look) => ladder(look)} />,
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
  description: 'The steps of a task in order, a numbered circle per step joined by lines, that shows where the user is.',
  points: [
    'Pass `steps` and `currentId`; `orientation="vertical"` runs the steps down the left.',
    'Moving between steps animates the circles and lines; reduced motion shows the end state at once.',
    'A step can carry a `summary` of what was chosen, sub-steps, an `error` state and its own `tone`.',
    'Every step keeps room for a summary, so the Stepper keeps its size; `reserve="none"` drops it.',
    'Only steps that `canSelect` allows can be clicked.',
    '`selectMode="toggle"` makes every step a button with `aria-pressed`; `onSelect` is where the app flips the step.',
    '`labelPlacement="above"` puts the name over the picture and dot; give a step `media`, `state` and `struck` for a ladder.',
    '`dotVariant="ring"` draws a coloured ring with the number and no fill; a step `state` lights it on its own.',
    '`compact` shows Step 2 of 5 with a [ProgressBar].',
  ],
  instead: '[NumberInput] for a number with plus and minus buttons.',
  playground: Playground,
  variants: [StepByStep, StepByStepLeft, Horizontal, SubStepsOnTop, Room, Vertical, IconsAndColours, Compact, LadderPick, LadderLooks],
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
export { Compact, Horizontal, IconsAndColours, LadderLooks, LadderPick, Overview, Playground, Room, StepByStep, StepByStepLeft, SubStepsOnTop, Vertical };
