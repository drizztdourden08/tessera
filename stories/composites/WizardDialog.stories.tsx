/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import type { StepperOrientation } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { CalibrationWizard } from './_samples/CalibrationWizard';
import { RomImportDialogDemo } from './_samples/RomImportDialogDemo';
import { WIZARD_LOOK_ARG_TYPES } from './_samples/wizard-look-arg-types';

type WizardDialogArgs = {
  title: string;
  orientation: StepperOrientation;
  compactProgress: boolean;
};

const ARGS: Partial<WizardDialogArgs> = { title: 'Import a ROM', orientation: 'horizontal', compactProgress: false };

const ARG_TYPES: PlaygroundArgTypes<WizardDialogArgs> = {
  title: { group: 'Content', control: 'text', description: 'The title in the dialog header.' },
  ...WIZARD_LOOK_ARG_TYPES,
};

const meta = {
  title: 'Composites · Dialogs/WizardDialog',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<WizardDialogArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <RomImportDialogDemo title={args.title} orientation={args.orientation} compact={args.compactProgress} />,
} satisfies PlaygroundStory<WizardDialogArgs>;

const Calibration = {
  name: 'Calibrating a controller',
  render: () => <CalibrationWizard />,
} satisfies StoryLiteStoryDefinition<WizardDialogArgs>;

const StepsOnTheLeft = {
  name: 'Steps on the left',
  render: () => <RomImportDialogDemo title="Import a ROM" orientation="vertical" compact={false} />,
} satisfies StoryLiteStoryDefinition<WizardDialogArgs>;

const CODE = `import { useWizard, WizardDialog } from '@drizztdourden08/tessera';

const wizard = useWizard({ steps: CALIBRATION_STEPS, initialValues: EMPTY, onFinish: saveCalibration, onFinished: close });

<WizardDialog wizard={wizard} open={open} title="Left Stick Calibration" onExit={close}>
  <CalibrationStep wizard={wizard} />
</WizardDialog>`;

const Overview = overviewStory({
  component: 'WizardDialog',
  description: 'A wizard in a dialog: the standard dialog header with its title and close button on top, then the same layout Wizard draws, with the Stepper, the step and the action bar. The step definitions drive it the same way. The close button, Escape and a click on the backdrop all go through the exit guard, so unsaved input is never thrown away without asking, and none of them close the dialog while the finish runs.',
  playground: Playground,
  variants: [Calibration, StepsOnTheLeft],
  code: CODE,
});

export default meta;
export { Calibration, Overview, Playground, StepsOnTheLeft };
