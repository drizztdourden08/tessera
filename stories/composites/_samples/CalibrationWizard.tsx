/* @layer stories @kind story */
import { useCallback, useState } from 'react';
import { useWizard, WizardFrame, WizardReview } from '../../../src/composites';
import type { CreateOutcome, WizardApi, WizardStepDef } from '../../../src/composites';
import { Box, Button, Icon, P, ProgressBar, Slider, Span } from '../../../src/primitives';
import { LiveStickPlot } from './LiveStickPlot';
import { useSampler } from './useSampler';

type CalibrationDraft = { centered: boolean; ranged: boolean; inner: number; outer: number };

type BodyProps = { wizard: WizardApi<CalibrationDraft> };

const STEPS: readonly WizardStepDef<CalibrationDraft>[] = [
  {
    id: 'center',
    label: 'Center',
    description: 'Leave both sticks at rest. Don\'t touch them. The software will record the idle center position.',
    validate: (d) => (d.centered ? null : 'Sample the center to continue.'),
  },
  {
    id: 'range',
    label: 'Range',
    description: 'Slowly rotate both sticks in full circles, reaching the physical limits in all directions.',
    validate: (d) => (d.ranged ? null : 'Rotate both sticks fully to continue.'),
  },
  { id: 'review', label: 'Review', description: 'Test the calibrated output. Sticks should be centered at rest and reach the edge evenly. Adjust the deadzones where it helps.' },
];

const INITIAL: CalibrationDraft = { centered: false, ranged: false, inner: 8, outer: 92 };

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
  if (wizard.current.id === 'center') return <Sampling label="Sampling" action="Sample the center" onDone={() => setValue('centered', true)} />;
  if (wizard.current.id === 'range') {
    return (
      <Box className="calibration-wizard-story__stick">
        <LiveStickPlot size="lg" label="Left stick" />
        <Sampling label="Range covered" action="Start recording the range" onDone={() => setValue('ranged', true)} />
      </Box>
    );
  }
  return (
    <>
      <Box className="calibration-wizard-story__stick">
        <LiveStickPlot size="lg" label="Left stick" calibrated innerDeadzone={values.inner / 100} outerDeadzone={values.outer / 100} />
        <Box className="story-column">
          <Slider label="Inner Deadzone" description="Eliminates stick drift near center" value={values.inner} min={0} max={30} onChange={(v) => setValue('inner', v)} showValue formatValue={percent} />
          <Slider label="Outer Deadzone" description="Reach full tilt before physical edge" value={values.outer} min={70} max={100} onChange={(v) => setValue('outer', v)} showValue formatValue={percent} />
        </Box>
      </Box>
      <WizardReview sections={[{ stepId: 'center', title: 'Calibration', rows: [{ term: 'Center', detail: 'Sampled' }, { term: 'Range', detail: 'Full circle on both sticks' }] }]} onEdit={wizard.goTo} disabled={wizard.busy} />
    </>
  );
};

const CalibrationFrame = ({ open, onDone }: { open: boolean; onDone: (message: string) => void }) => {
  const onFinish = useCallback(async (): Promise<CreateOutcome> => {
    await new Promise((resolve) => {
      setTimeout(resolve, 700);
    });
    return { success: true, id: 'left-stick' };
  }, []);
  const wizard = useWizard({ steps: STEPS, initialValues: INITIAL, onFinish, onFinished: () => onDone('Calibration saved for the left stick.') });
  return (
    <WizardFrame
      wizard={wizard}
      presentation="dialog"
      open={open}
      title="Left Stick Calibration"
      onExit={() => onDone('Left without saving.')}
      finishLabel="Save Calibration"
      busyLabel="Saving..."
    >
      <Body wizard={wizard} />
    </WizardFrame>
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
      <P tone="dim">From Advanced, Input Calibration: the stick calibration opens over the screen.</P>
      <Box className="story-row">
        <Button variant="secondary" icon={<Icon name="gamepad-2" />} onClick={() => setOpen(true)}>Calibrate left stick</Button>
      </Box>
      <CalibrationFrame key={run} open={open} onDone={close} />
      <Span tone="muted" className="story-label">{note}</Span>
    </Box>
  );
};

export { CalibrationWizard };
