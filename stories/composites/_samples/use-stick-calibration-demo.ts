/* @layer stories @kind hook */
import { useEffect, useState } from 'react';
import type { CalibrationPanelAction, StickPlotPoint, StickPlotRange } from '../../../src/composites';
import { stickAt } from './controller-motion';
import type { StickMotion } from './controller-motion';
import { useAnimationTime } from './use-animation-time';

type StickStep = 'center' | 'range' | 'review';

const MOTION_FOR: Record<StickStep, StickMotion> = { center: 'rest', range: 'roll', review: 'free' };
const MIN_SPAN = 1.2;

const grow = (range: StickPlotRange | undefined, x: number, y: number): StickPlotRange => ({
  minX: Math.min(range?.minX ?? x, x),
  maxX: Math.max(range?.maxX ?? x, x),
  minY: Math.min(range?.minY ?? y, y),
  maxY: Math.max(range?.maxY ?? y, y),
});

const useStickCalibrationDemo = () => {
  const [step, setStep] = useState<StickStep>('center');
  const [center, setCenter] = useState<StickPlotPoint>();
  const [range, setRange] = useState<StickPlotRange>();
  const [inner, setInner] = useState(0.12);
  const [outer, setOuter] = useState(0.92);
  const { x, y } = stickAt(useAnimationTime(), MOTION_FOR[step]);
  const spanX = range ? range.maxX - range.minX : 0;
  const spanY = range ? range.maxY - range.minY : 0;

  useEffect(() => {
    if (step === 'range') setRange((current) => grow(current, x, y));
  }, [step, x, y]);

  const reset = () => {
    setStep('center');
    setCenter(undefined);
    setRange(undefined);
  };

  const recordCenter = () => {
    setCenter({ x, y });
    setRange(grow(undefined, x, y));
    setStep('range');
  };

  const actions: Record<StickStep, CalibrationPanelAction> = {
    center: { label: 'Record center', onClick: recordCenter },
    range: { label: 'Next', disabled: spanX < MIN_SPAN || spanY < MIN_SPAN, onClick: () => setStep('review') },
    review: { label: 'Save', onClick: reset },
  };

  const readout = step === 'range'
    ? `span x ${spanX.toFixed(2)}  y ${spanY.toFixed(2)}`
    : `x ${x.toFixed(2)}  y ${y.toFixed(2)}`;

  return { step, x, y, center, range, inner, setInner, outer, setOuter, readout, action: actions[step], reset };
};

export { useStickCalibrationDemo };
export type { StickStep };
