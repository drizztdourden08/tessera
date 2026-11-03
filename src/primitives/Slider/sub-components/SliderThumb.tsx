/* @layer renderer-components @kind component */
import type { KeyboardEvent } from 'react';
import { keyTarget } from '../behavior/key-target';
import { thumbScale } from '../behavior/thumb-scale';
import { thumbValue } from '../behavior/thumb-value';
import { valueOfThumb } from '../behavior/value-of-thumb';
import { valueText } from '../../value-rule/value-text';
import type { SliderThumbProps } from './SliderThumb.type';

const SliderThumb = (props: SliderThumbProps) => {
  const { value, scale, disabled, label, labelledBy, describedBy, id, name, keyStep, ladder, mixedText, onTop = false, hot = false, orientation, onValue, onFocus, ref } = props;

  const handleKey = (event: KeyboardEvent<HTMLInputElement>) => {
    const target = keyTarget({ key: event.key, value, scale, keyStep, ladder });
    if (target === null) return;
    event.preventDefault();
    onValue(target);
  };

  const space = thumbScale(scale);

  return (
    <input
      ref={ref}
      type="range"
      className={['slider__input', onTop && 'slider__input--top', hot && 'slider__input--hot'].filter(Boolean).join(' ')}
      id={id}
      name={name}
      min={space.min}
      max={space.max}
      step={space.step}
      value={thumbValue(value, scale)}
      disabled={disabled}
      aria-label={label}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      aria-valuetext={mixedText ?? valueText(value, scale)}
      aria-orientation={orientation}
      onChange={(event) => onValue(valueOfThumb(Number(event.target.value), scale))}
      onFocus={onFocus}
      onKeyDown={handleKey}
    />
  );
};

export { SliderThumb };
