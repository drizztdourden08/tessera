/* @layer renderer-components @kind component */
import type { KeyboardEvent } from 'react';
import { clampValue } from '../behavior/clamp-value';
import { keyDelta } from '../behavior/key-delta';
import { valueText } from '../../value-rule/value-text';
import type { SliderThumbProps } from './SliderThumb.type';

const SliderThumb = (props: SliderThumbProps) => {
  const { value, scale, disabled, label, labelledBy, describedBy, id, name, keyStep, onTop = false, hot = false, onValue, onFocus, ref } = props;

  const handleKey = (event: KeyboardEvent<HTMLInputElement>) => {
    const delta = keyStep ? keyDelta(event.key, keyStep) : 0;
    if (delta === 0) return;
    event.preventDefault();
    onValue(clampValue(value + delta, scale));
  };

  return (
    <input
      ref={ref}
      type="range"
      className={['slider__input', onTop && 'slider__input--top', hot && 'slider__input--hot'].filter(Boolean).join(' ')}
      id={id}
      name={name}
      min={scale.min}
      max={scale.max}
      step={scale.step}
      value={value}
      disabled={disabled}
      aria-label={label}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      aria-valuetext={valueText(value, scale)}
      onChange={(event) => onValue(Number(event.target.value))}
      onFocus={onFocus}
      onKeyDown={handleKey}
    />
  );
};

export { SliderThumb };
