/* @layer stories @kind component */
import { ProgressBar, Slider, Stack, StatRow } from '../../../src/primitives';
import { CalibrationStep } from './CalibrationStep';
import { useTriggerCalibrationDemo } from './use-trigger-calibration-demo';
import type { TriggerStep } from './use-trigger-calibration-demo';

const TRIGGER_STEP_TEXT: Record<TriggerStep, string> = {
  rest: 'Let go of the trigger, then record its resting point.',
  press: 'Pull the trigger all the way in and let it out again.',
  review: 'Set the dead zone, then save.',
};

const TriggerCalibrationDemo = () => {
  const { step, value, peak, deadzone, setDeadzone, readout, action, restart } = useTriggerCalibrationDemo();

  return (
    <CalibrationStep
      title="Calibrate Right trigger"
      instruction={TRIGGER_STEP_TEXT[step]}
      readout={readout}
      action={action}
      onCancel={restart}
    >
      <Stack gap="xs">
        <StatRow label="Right trigger" value={value.toFixed(2)} mono />
        <ProgressBar value={value} max={1} secondaryValue={step === 'rest' ? undefined : peak} live />
      </Stack>
      {step === 'review' && (
        <Slider label="Dead zone" value={deadzone} min={0} max={0.3} step={0.01} onChange={setDeadzone} showValue />
      )}
    </CalibrationStep>
  );
};

export { TriggerCalibrationDemo };
