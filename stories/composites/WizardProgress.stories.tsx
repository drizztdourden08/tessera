/* @layer stories @kind story */
import type { StoryLiteArgTypes, StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { WizardProgress } from '../../src/composites';
import type { WizardOrientation } from '../../src/composites';
import { Box } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import { idAt, stripSteps } from './_samples/wizard-progress-data';
import { StripDriver } from './_samples/StripDriver';
import './WizardProgress.stories.css';

type ProgressArgs = {
  orientation: WizardOrientation;
  compact: boolean;
  step: number;
  summaries: boolean;
  subSteps: boolean;
};

const ARGS: Partial<ProgressArgs> = { orientation: 'horizontal', compact: false, step: 3, summaries: true, subSteps: true };

const ARG_TYPES: StoryLiteArgTypes<ProgressArgs> = {
  orientation: { control: 'select', options: ['horizontal', 'vertical'] },
  compact: { control: 'boolean', description: 'Step 3 of 6 and a bar.' },
  step: { control: 'number', description: 'The current step, from 1. Change it to watch the fill.' },
  summaries: { control: 'boolean', description: 'Vertical only: what was chosen, under each done step.' },
  subSteps: { control: 'boolean', description: 'Vertical only: the option tabs under Randomizer options.' },
};

const meta = {
  title: 'Composites · Wizard/WizardProgress',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ProgressArgs>;

const before = (at: number) => (id: string) => ['basics', 'mode', 'seed', 'options', 'settings', 'review'].indexOf(id) < at;

const strip = (args: ProgressArgs) => {
  const at = Math.max(args.step - 1, 0);
  const progress = (
    <WizardProgress
      steps={stripSteps({ summaries: args.summaries, subSteps: args.subSteps, long: args.orientation === 'vertical' }, at)}
      currentId={idAt(at)}
      orientation={args.orientation}
      compact={args.compact}
      canSelect={before(at)}
      onSelect={() => undefined}
      activeSubStepId="dungeon"
    />
  );
  return args.orientation === 'vertical' ? <Box className="wizard-progress-story__rail">{progress}</Box> : progress;
};

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => strip(args),
} satisfies StoryLiteStoryDefinition<ProgressArgs>;

const StepByStep = {
  name: 'Step by step',
  render: () => <StripDriver />,
} satisfies StoryLiteStoryDefinition<ProgressArgs>;

const PLACES = ['Step 1', 'Step 3', 'Step 6'] as const;

const placeOf = (place: string) => Number.parseInt(place.replace('Step ', ''), 10);

const Horizontal = {
  name: 'Steps on top',
  render: () => (
    <Demonstrator
      rows={axis(PLACES)}
      align="stretch"
      cell={(place) => strip({ orientation: 'horizontal', compact: false, step: placeOf(place), summaries: false, subSteps: false })}
    />
  ),
} satisfies StoryLiteStoryDefinition<ProgressArgs>;

const LOOKS = ['Labels only', 'With summaries', 'With sub-steps'] as const;

const Vertical = {
  name: 'Steps on the left',
  render: () => (
    <Demonstrator
      columns={axis(LOOKS)}
      valign="start"
      cell={(_row, look) => strip({ orientation: 'vertical', compact: false, step: 4, summaries: look !== 'Labels only', subSteps: look === 'With sub-steps' })}
    />
  ),
} satisfies StoryLiteStoryDefinition<ProgressArgs>;

const Compact = {
  name: 'Compact, for tight spaces',
  render: () => (
    <Demonstrator
      rows={axis(PLACES)}
      align="stretch"
      cell={(place) => (
        <Box className="wizard-progress-story__compact">
          {strip({ orientation: 'horizontal', compact: true, step: placeOf(place), summaries: false, subSteps: false })}
        </Box>
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<ProgressArgs>;

const DONE_STEP = '.wizard-progress__item[data-state="done"] .wizard-progress__step';

const Overview = overviewStory({
  component: 'WizardProgress',
  description: 'The step strip of a wizard: a numbered circle per step with its label underneath, or beside it when the strip runs down the left. When a step is done its circle fills with the primary colour from left to right while its border draws, then the line to the next circle grows, then the next circle lights up as current. Going back plays a quick reverse, and reduced motion shows the end state at once. Only steps the user has done, or can reach, can be clicked; the current step carries aria-current. On the left, a step can show what was chosen under its label and indented sub-steps with a count each. The compact form is Step 2 of 5 with a ProgressBar. Not to be confused with Stepper, the number input.',
  playground: Playground,
  variants: [StepByStep, Horizontal, Vertical, Compact],
  states: {
    render: () => strip({ orientation: 'horizontal', compact: false, step: 3, summaries: false, subSteps: false }),
    list: [
      STATE.idle,
      { ...STATE.hover, target: DONE_STEP },
      { ...STATE.focus, target: DONE_STEP },
    ],
  },
});

export default meta;
export { Compact, Horizontal, Overview, Playground, StepByStep, Vertical };
