/* @layer stories @kind data */
import type { StepperOrientation } from '../../../src/primitives';
import type { PlaygroundArgTypes } from '../../_template/controls/playground.type';

type WizardLookArgs = {
  compactProgress: boolean;
  orientation: StepperOrientation;
};

const WIZARD_LOOK_ARG_TYPES: PlaygroundArgTypes<WizardLookArgs> = {
  compactProgress: { group: 'Appearance', control: 'boolean', description: 'Step 2 of 4 and a bar, for tight spaces.' },
  orientation: { group: 'Layout', control: 'select', options: ['horizontal', 'vertical'], description: 'Steps on top, or in a column on the left.' },
};

export { WIZARD_LOOK_ARG_TYPES };
