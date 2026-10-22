/* @layer stories @kind data */
import type { PlaygroundArgTypes } from '../../_template/controls/playground.type';
import type { StepperDotVariant, StepperLabelPlacement, StepperOrientation, StepperReserve, StepperTone } from '../../../src/primitives';
import { STEPPER_STEPS } from './stepper-data';

type StepperArgs = {
  orientation: StepperOrientation;
  compact: boolean;
  step: number;
  summaries: boolean;
  reserve: StepperReserve;
  subSteps: boolean;
  error: boolean;
  doneIcon: 'check' | 'per step' | 'numbers';
  colour: StepperTone | 'per step';
  dotVariant: StepperDotVariant;
  labelPlacement: StepperLabelPlacement;
};

const COLOURS: readonly StepperArgs['colour'][] = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'info', 'teal', 'violet', 'per step'];

const ARGS: Partial<StepperArgs> = { orientation: 'horizontal', compact: false, step: 3, summaries: true, reserve: 'summaries', subSteps: true, error: false, doneIcon: 'check', colour: 'primary', dotVariant: 'filled', labelPlacement: 'below' };

const ARG_TYPES: PlaygroundArgTypes<StepperArgs> = {
  summaries: { group: 'Content', control: 'boolean', description: 'What was chosen, under each done step.' },
  reserve: { group: 'Layout', control: 'select', options: ['summaries', 'none'], description: 'Keeps a summary line under every step, so the Stepper keeps its size as steps fill in.' },
  subSteps: { group: 'Content', control: 'boolean', description: 'The option tabs of Randomizer options.' },
  compact: { group: 'Appearance', control: 'boolean', description: 'Step 3 of 6 and a bar.' },
  doneIcon: { group: 'Appearance', control: 'select', options: ['check', 'per step', 'numbers'], description: 'What a done circle shows. The number flips over to the icon.' },
  colour: { group: 'Appearance', control: 'select', options: COLOURS, description: 'The fill, border, glow and arriving line of each step.' },
  dotVariant: { group: 'Appearance', control: 'select', options: ['filled', 'ring'], description: 'A filled circle, or a coloured ring with the number inside.' },
  labelPlacement: { group: 'Layout', control: 'select', options: ['below', 'above'], description: 'Where the step name sits. Above only works with steps on top.' },
  orientation: { group: 'Layout', control: 'select', options: ['horizontal', 'vertical'] },
  step: { group: 'State', control: 'select', options: STEPPER_STEPS.map((_, index) => index + 1), description: 'The current step, from 1. Change it to watch the sequence.' },
  error: { group: 'State', control: 'boolean', description: 'Mode needs attention.' },
};

const flat: StepperArgs = { orientation: 'horizontal', compact: false, step: 1, summaries: false, reserve: 'summaries', subSteps: false, error: false, doneIcon: 'check', colour: 'primary', dotVariant: 'filled', labelPlacement: 'below' };

export { ARGS, ARG_TYPES, flat };
export type { StepperArgs };
