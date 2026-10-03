/* @layer stories @kind component */
import { StickPlot } from '../../../src/composites';
import { Slider } from '../../../src/primitives';
import { CalibrationStep } from './CalibrationStep';
import { useStickCalibrationDemo } from './use-stick-calibration-demo';
import type { StickStep } from './use-stick-calibration-demo';

const STICK_STEP_TEXT: Record<StickStep, string> = {
  center: 'Let go of the stick so it rests at its center, then record it.',
  range: 'Roll the stick around its full edge a few times.',
  review: 'Set the dead zones, then save.',
};

const StickCalibrationDemo = () => {
  const { step, x, y, center, range, inner, setInner, outer, setOuter, readout, action, reset } = useStickCalibrationDemo();

  return (
    <CalibrationStep
      title="Calibrate Left stick"
      instruction={STICK_STEP_TEXT[step]}
      readout={readout}
      action={action}
      onCancel={reset}
    >
      <StickPlot
        x={x}
        y={y}
        size="lg"
        showValue={false}
        center={center}
        range={range}
        innerDeadzone={inner}
        outerDeadzone={outer}
      />
      {step === 'review' && (
        <>
          <Slider label="Inner dead zone" value={inner} min={0} max={0.5} step={0.01} onChange={setInner} showValue />
          <Slider label="Outer dead zone" value={outer} min={0.5} max={1} step={0.01} onChange={setOuter} showValue />
        </>
      )}
    </CalibrationStep>
  );
};

export { StickCalibrationDemo };
