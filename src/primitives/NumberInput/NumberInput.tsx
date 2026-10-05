/* @layer renderer-components @kind component */
import '../../theme/control-size.css';
import '../../theme/field-surface.css';
import './NumberInput.css';
import { useFieldControl } from '../Field/behavior/useFieldControl';
import { InputAdornmentSlot } from '../field-control/InputAdornmentSlot';
import { useControlSize } from '../field-control/useControlSize';
import type { NumberInputProps } from './NumberInput.type';
import { columnVars } from './behavior/column-vars';
import { digitColumns } from './behavior/digit-columns';
import { numberInputClass } from './behavior/number-input-class';
import { shownValue } from './behavior/shown-value';
import { stepValue } from './behavior/step-value';
import { NumberInputSteps } from './sub-components/NumberInputSteps';

const NumberInput = (props: NumberInputProps) => {
  const {
    onChange, className, value, min, max, step, disabled = false, buttons, sizeToContent = false,
    invalid, size, start, end, id, 'aria-describedby': ownDescribedBy, ...rest
  } = props;
  const control = useFieldControl(id, ownDescribedBy);
  const controlSize = useControlSize(size);
  const isInvalid = invalid ?? control.invalid ?? false;
  const locked = disabled || rest.readOnly === true;
  const sides = buttons === 'sides';
  const stepBy = (dir: 1 | -1): void => onChange?.(stepValue(value, dir, { step, min, max }));
  const steps = { size: controlSize, disabled, onStep: stepBy };
  const columns = digitColumns(sizeToContent, max, step);

  return (
    <div className={numberInputClass({ size: controlSize, sides, auto: columns !== undefined, disabled, className })} style={columnVars(columns)}>
      {sides && <NumberInputSteps at="start" {...steps} />}
      <InputAdornmentSlot className="number-input__slot" adornment={start} size={controlSize} disabled={locked} />
      <input
        type="number"
        className="number-input__field"
        value={shownValue(value)}
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
      <InputAdornmentSlot className="number-input__slot" adornment={end} size={controlSize} disabled={locked} />
      <NumberInputSteps at={sides ? 'end' : 'stack'} {...steps} />
    </div>
  );
};

export { NumberInput };
