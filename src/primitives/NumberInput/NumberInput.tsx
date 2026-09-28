/* @layer renderer-components @kind component */
import '../../theme/field-surface.css';
import './NumberInput.css';
import { useFieldControl } from '../Field/behavior/useFieldControl';
import { PathIcon } from '../PathIcon';
import type { CSSProperties } from 'react';
import type { NumberInputProps } from './NumberInput.type';
import { CHEVRON_DOWN, CHEVRON_UP } from './NumberInput.constants';

const toNum = (v: unknown): number | undefined => {
  const n = Number(v);
  return v === undefined || v === '' || Number.isNaN(n) ? undefined : n;
};

const NumberInput = (props: NumberInputProps) => {
  const {
    onChange, className = '', value, min, max, step, disabled = false, sizeToContent = false,
    id, 'aria-describedby': ownDescribedBy, ...rest
  } = props;
  const control = useFieldControl(id, ownDescribedBy);

  const stepBy = (dir: 1 | -1): void => {
    const stepN = toNum(step) ?? 1;
    const minN = toNum(min);
    const maxN = toNum(max);
    const cur = toNum(value) ?? minN ?? 0;
    let next = cur + dir * stepN;
    if (minN !== undefined && next < minN) next = minN;
    if (maxN !== undefined && next > maxN) next = maxN;
    onChange?.(Number(next.toFixed(6)));
  };

  const digitColumns = (): number | undefined => {
    if (!sizeToContent) return undefined;
    const maxNum = toNum(max);
    if (maxNum === undefined) return undefined;
    const whole = Math.max(1, Math.abs(maxNum).toString().length);
    const stepN = toNum(step);
    const places = stepN !== undefined && !Number.isInteger(stepN)
      ? (String(stepN).split('.')[1]?.length ?? 1)
      : 0;
    return whole + (places > 0 ? places + 1 : 0);
  };

  const columns = digitColumns();
  const sizingVars = columns === undefined
    ? undefined
    : ({ '--number-input-columns': String(columns) } as CSSProperties);

  return (
    <div
      className={`number-input ${columns === undefined ? '' : 'number-input--auto'} ${disabled ? 'number-input--disabled' : ''} ${className}`}
      style={sizingVars}
    >
      <input
        type="number"
        className="number-input__field"
        value={value}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.valueAsNumber)}
        id={control.id}
        aria-describedby={control.describedBy}
        {...rest}
      />
      <div className="number-input__spin">
        <button type="button" className="number-input__btn" tabIndex={-1} aria-label="Increment" disabled={disabled} onClick={() => stepBy(1)}>
          <PathIcon size={12} paths={[CHEVRON_UP]} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </button>
        <button type="button" className="number-input__btn" tabIndex={-1} aria-label="Decrement" disabled={disabled} onClick={() => stepBy(-1)}>
          <PathIcon size={12} paths={[CHEVRON_DOWN]} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </button>
      </div>
    </div>
  );
};

export { NumberInput };
