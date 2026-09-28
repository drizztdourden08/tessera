/* @layer renderer-components @kind component */
import type { RangeThumbProps } from './RangeThumb.type';

const RangeThumb = (props: RangeThumbProps) => {
  const { value, last, disabled, onTop, edge, ariaLabel, valueText, onValue, onFocus, onKeyDown } = props;
  return (
    <input
      type="range"
      className={`range-slider__input${onTop ? ' range-slider__input--top' : ''}`}
      min={0}
      max={last}
      step={1}
      value={value}
      disabled={disabled}
      aria-label={ariaLabel ? `${ariaLabel} ${edge}` : edge}
      aria-valuetext={valueText}
      onChange={(event) => onValue(Number(event.target.value))}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
    />
  );
};

export { RangeThumb };
