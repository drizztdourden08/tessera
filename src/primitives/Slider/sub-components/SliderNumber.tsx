/* @layer renderer-components @kind component */
import { useState } from 'react';
import { NumberInput } from '../../NumberInput';
import { snapValue } from '../behavior/snap-value';
import type { SliderNumberProps } from './SliderNumber.type';

const SliderNumber = (props: SliderNumberProps) => {
  const { value, scale, disabled, label, onValue } = props;
  const [draft, setDraft] = useState<number | undefined>(undefined);
  const change = (next: number) => {
    setDraft(next);
    if (Number.isFinite(next) && next >= scale.min && next <= scale.max) onValue(snapValue(next, scale));
  };

  return (
    <NumberInput
      className="slider__number"
      value={Number.isFinite(draft) ? draft : value}
      min={scale.min}
      max={scale.max}
      step={scale.step}
      disabled={disabled}
      sizeToContent
      aria-label={label}
      onChange={change}
      onBlur={() => setDraft(undefined)}
    />
  );
};

export { SliderNumber };
