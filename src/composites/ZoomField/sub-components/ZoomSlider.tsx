/* @layer renderer-components @kind component */
import { Slider } from '../../../primitives/Slider';
import { ZOOM_SUFFIX } from '../ZoomField.constants';
import type { ZoomSliderProps } from '../ZoomField.type';

const percentText = (value: number): string => `${String(Math.round(value))}${ZOOM_SUFFIX}`;

const ZoomSlider = ({ value, min, max, ladder, label, placement, disabled, onChange }: ZoomSliderProps) => (
  <Slider
    scale="log"
    min={min}
    max={max}
    ladder={ladder}
    value={value}
    onChange={(next) => onChange(Math.round(next))}
    formatValue={percentText}
    aria-label={label}
    disabled={disabled}
    className={`zoom-field__slider zoom-field__slider--${placement}`}
  />
);

export { ZoomSlider };
