/* @layer renderer-components @kind component */
import '../../theme/field-surface.css';
import './NumberInput.css';
import { preventTextSelection } from '../dom/prevent-text-selection';
import { useFieldControl } from '../Field/behavior/useFieldControl';
import { Glyph } from '../Glyph';
import type { CSSProperties } from 'react';
import type { NumberInputProps } from './NumberInput.type';
import { digitColumns } from './behavior/digit-columns';
import { toNumber } from './behavior/to-number';

const NumberInput = (props: NumberInputProps) => {
  const {
    onChange, className = '', value, min, max, step, disabled = false, sizeToContent = false,
    invalid, id, 'aria-describedby': ownDescribedBy, ...rest
  } = props;
  const control = useFieldControl(id, ownDescribedBy);
  const isInvalid = invalid ?? control.invalid ?? false;

  const stepBy = (dir: 1 | -1): void => {
    const stepN = toNumber(step) ?? 1;
    const minN = toNumber(min);
    const maxN = toNumber(max);
    const cur = toNumber(value) ?? minN ?? 0;
    let next = cur + dir * stepN;
    if (minN !== undefined && next < minN) next = minN;
    if (maxN !== undefined && next > maxN) next = maxN;
    onChange?.(Number(next.toFixed(6)));
  };

  const columns = digitColumns(sizeToContent, max, step);
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
        aria-invalid={isInvalid ? true : undefined}
        {...rest}
      />
      <div className="number-input__spin">
        <button type="button" className="number-input__btn" tabIndex={-1} aria-label="Increment" disabled={disabled} onMouseDown={preventTextSelection} onClick={() => stepBy(1)}>
          <Glyph name="chevronUp" size={12} strokeWidth={2} />
        </button>
        <button type="button" className="number-input__btn" tabIndex={-1} aria-label="Decrement" disabled={disabled} onMouseDown={preventTextSelection} onClick={() => stepBy(-1)}>
          <Glyph name="chevronDown" size={12} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};

export { NumberInput };
