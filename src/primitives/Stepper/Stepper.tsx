/* @layer renderer-components @kind component */
import '../../theme/control-size.css';
import '../../theme/field-surface.css';
import './Stepper.css';
import { preventTextSelection } from '../dom/prevent-text-selection';
import { useControlSize } from '../field-control/useControlSize';
import { Glyph } from '../Glyph';
import { useTesseraStrings } from '../TesseraProvider/behavior/useTesseraStrings';
import { STEPPER_GLYPH_SIZES } from './Stepper.constants';
import type { StepperProps } from './Stepper.type';

const clampValue = (v: number, min?: number, max?: number): number => {
  if (min !== undefined && v < min) return min;
  if (max !== undefined && v > max) return max;
  return v;
};

const Stepper = (props: StepperProps) => {
  const { value, onChange, min, max, step = 1, disabled = false, size, ariaLabel, className = '' } = props;
  const { fields } = useTesseraStrings();
  const controlSize = useControlSize(size);
  const glyphSize = STEPPER_GLYPH_SIZES[controlSize];

  const stepBy = (dir: 1 | -1): void => {
    const base = Number.isNaN(value) ? (min ?? 0) : value;
    const next = clampValue(Math.round((base + dir * step) / step) * step, min, max);
    onChange(Number(next.toFixed(6)));
  };

  const handleType = (raw: string): void => {
    const cleaned = raw.replace(/[^0-9]/g, '');
    onChange(cleaned === '' ? Number.NaN : Number(cleaned));
  };

  return (
    <div className={`stepper control-size--${controlSize} ${disabled ? 'stepper--disabled' : ''} ${className}`}>
      <button type="button" className="stepper__btn" aria-label={fields.decrease} disabled={disabled} onMouseDown={preventTextSelection} onClick={() => stepBy(-1)}><Glyph name="minus" size={glyphSize} /></button>
      <input
        type="text"
        inputMode="numeric"
        className="stepper__field"
        aria-label={ariaLabel}
        disabled={disabled}
        value={Number.isNaN(value) ? '' : String(value)}
        onChange={(e) => handleType(e.target.value)}
      />
      <button type="button" className="stepper__btn" aria-label={fields.increase} disabled={disabled} onMouseDown={preventTextSelection} onClick={() => stepBy(1)}><Glyph name="plus" size={glyphSize} /></button>
    </div>
  );
};

export { Stepper };
