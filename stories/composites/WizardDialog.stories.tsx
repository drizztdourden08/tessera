/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import type { WizardDialogSize } from '../../src/composites';
import type { StepperOrientation } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { CalibrationWizard } from './_samples/CalibrationWizard';
import { RomImportDialogDemo } from './_samples/RomImportDialogDemo';
import { WIZARD_LOOK_ARG_TYPES } from './_samples/wizard-look-arg-types';

type WizardDialogArgs = {
  title: string;
  orientation: StepperOrientation;
  compactProgress: boolean;
  size: WizardDialogSize;
};

const ARGS: Partial<WizardDialogArgs> = { title: 'Import a ROM', orientation: 'horizontal', compactProgress: false, size: 'wide' };

const ARG_TYPES: PlaygroundArgTypes<WizardDialogArgs> = {
  title: { group: 'Content', control: 'text', description: 'The title in the dialog header.' },
  size: { group: 'Layout', control: 'select', options: ['md', 'wide', 'lg', 'xl'], description: 'The widest the dialog grows: 640, 768, 896 or 1024 px. A wider dialog gives the step body more room next to the steps.' },
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
  render: (args) => <RomImportDialogDemo title={args.title} orientation={args.orientation} compact={args.compactProgress} size={args.size} />,
} satisfies PlaygroundStory<WizardDialogArgs>;

const Calibration = {
  name: 'Calibrating a controller',
  render: () => <CalibrationWizard />,
} satisfies StoryLiteStoryDefinition<WizardDialogArgs>;

const StepsOnTheLeft = {
  name: 'Steps on the left',
  render: () => <RomImportDialogDemo title="Import a ROM" orientation="vertical" compact={false} />,
} satisfies StoryLiteStoryDefinition<WizardDialogArgs>;

const Roomy = {
  name: 'Roomy: size xl for a wide step body',
  render: () => <RomImportDialogDemo title="Import a ROM" orientation="vertical" compact={false} size="xl" />,
} satisfies StoryLiteStoryDefinition<WizardDialogArgs>;

const CODE = `import { useState } from 'react';
import { useWizard, WizardDialog } from '@drizztdourden08/tessera';

const [checking, setChecking] = useState(false);
const wizard = useWizard({ steps: CALIBRATION_STEPS, initialValues: EMPTY, onFinish: saveCalibration, onFinished: close });

<WizardDialog wizard={wizard} open={open} size="lg" busy={checking} title="Right Trigger Calibration" onExit={close}>
  <CalibrationStep wizard={wizard} />
</WizardDialog>`;

const Overview = overviewStory({
  component: 'WizardDialog',
  description: 'A [Wizard] in a dialog, under the standard dialog header with its title and close button.',
  points: [
    'It takes the same step definitions and props as [Wizard], plus `open`.',
    'Close, [[Esc]] and a click on the backdrop ask first when there is unsaved input.',
    'None of them close the dialog while the finish runs, or while `busy` is set.',
    '`size` is `md`, `wide` (the default), `lg` or `xl`, from 640 to 1024 px.',
  ],
  instead: '[Wizard] for steps inside a screen instead of over it.',
  playground: Playground,
  variants: [Calibration, StepsOnTheLeft, Roomy],
  code: CODE,
});

export default meta;
export { Calibration, Overview, Playground, Roomy, StepsOnTheLeft };
