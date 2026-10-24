/* @layer stories @kind story */
import { useCallback, useState } from 'react';
import { useWizard, WizardDialog, WizardReview } from '../../../src/composites';
import type { CreateOutcome, WizardApi, WizardStepDef } from '../../../src/composites';
import { Box, Button, Icon, P, ProgressBar, Slider, Span } from '../../../src/primitives';
import { LiveTrigger } from '../../primitives/_samples/LiveTrigger';
import { useSampler } from './useSampler';

type CalibrationDraft = { rested: boolean; pulled: boolean; deadzone: number };

type BodyProps = { wizard: WizardApi<CalibrationDraft> };

const STEPS: readonly WizardStepDef<CalibrationDraft>[] = [
  {
    id: 'rest',
    label: 'Rest',
    description: 'Let go of the trigger. Don\'t touch it. The software will record its resting point.',
    validate: (d) => (d.rested ? null : 'Sample the resting point to continue.'),
  },
  {
    id: 'pull',
    label: 'Pull',
    description: 'Pull the trigger all the way in and let it out again, a few times.',
    validate: (d) => (d.pulled ? null : 'Pull the trigger fully to continue.'),
  },
  {
    id: 'review',
    label: 'Review',
    description: 'Test the calibrated output. The trigger should read zero at rest and reach one when pulled. Adjust the dead zone where it helps.',
    busyHint: 'Saving...',
    buttons: { next: { label: 'Save Calibration', icon: 'save' } },
  },
];

const INITIAL: CalibrationDraft = { rested: false, pulled: false, deadzone: 5 };

const percent = (value: number) => `${value}%`;

const Sampling = ({ label, action, onDone }: { label: string; action: string; onDone: () => void }) => {
  const { progress, start } = useSampler(1500, onDone);
  return (
    <Box className="story-column">
      <Button variant="secondary" icon={<Icon name="refresh-cw" />} disabled={progress !== null && progress < 100} onClick={start}>{progress === null ? action : 'Redo'}</Button>
      {progress !== null && <ProgressBar value={progress} label={label} />}
      {progress !== null && <Span tone="muted">{progress < 100 ? `${label}... ${Math.round(progress)}%` : `${label}: done`}</Span>}
    </Box>
  );
};

const Body = ({ wizard }: BodyProps) => {
  const { values, setValue } = wizard;
  if (wizard.current.id === 'rest') return <Sampling label="Sampling" action="Sample the resting point" onDone={() => setValue('rested', true)} />;
  if (wizard.current.id === 'pull') {
    return (
      <Box className="story-column">
        <LiveTrigger />
        <Sampling label="Travel covered" action="Start recording the travel" onDone={() => setValue('pulled', true)} />
      </Box>
    );
  }
  return (
    <>
      <Box className="story-column">
        <LiveTrigger />
        <Slider label="Dead zone" description="Ignores a light touch near rest" value={values.deadzone} min={0} max={30} onChange={(v) => setValue('deadzone', v)} showValue formatValue={percent} />
      </Box>
      <WizardReview sections={[{ stepId: 'rest', title: 'Calibration', rows: [{ label: 'Rest', value: 'Sampled' }, { label: 'Travel', value: 'Full pull recorded' }] }]} onEdit={wizard.goTo} disabled={wizard.busy} />
    </>
  );
};

const CalibrationFrame = ({ open, onDone }: { open: boolean; onDone: (message: string) => void }) => {
  const onFinish = useCallback(async (): Promise<CreateOutcome> => {
    await new Promise((resolve) => {
      setTimeout(resolve, 700);
    });
    return { success: true, id: 'right-trigger' };
  }, []);
  const wizard = useWizard({ steps: STEPS, initialValues: INITIAL, onFinish, onFinished: () => onDone('Calibration saved for the right trigger.') });
  return (
    <WizardDialog wizard={wizard} open={open} title="Right Trigger Calibration" onExit={() => onDone('Left without saving.')}>
      <Body wizard={wizard} />
    </WizardDialog>
  );
};

const CalibrationWizard = () => {
  const [open, setOpen] = useState(false);
  const [run, setRun] = useState(0);
  const [note, setNote] = useState('Nothing calibrated yet.');
  const close = (message: string) => {
    setNote(message);
    setOpen(false);
    setRun(run + 1);
  };
  return (
    <Box className="story-column">
      <P tone="dim">From Advanced, Input Calibration: the trigger calibration opens over the screen.</P>
      <Box className="story-row">
        <Button variant="secondary" icon={<Icon name="gamepad-2" />} onClick={() => setOpen(true)}>Calibrate right trigger</Button>
      </Box>
      <CalibrationFrame key={run} open={open} onDone={close} />
      <Span tone="muted" className="story-label">{note}</Span>
    </Box>
  );
};

export { CalibrationWizard };
