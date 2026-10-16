/* @layer renderer-components @kind component */
import { useEffect, useId, useRef } from 'react';
import { useFieldControl } from '../Field/behavior/useFieldControl';
import { helpLabelId } from '../field-control/help-label-id';
import { useControlSize } from '../field-control/useControlSize';
import { CheckboxText } from './sub-components/CheckboxText';
import '../../theme/control-size.css';
import '../../theme/label-size.css';
import './Checkbox.css';
import type { CheckboxProps } from './Checkbox.type';

const Checkbox = (props: CheckboxProps) => {
  const { checked, onChange, label, help, ariaLabel, disabled, indeterminate = false, size, labelSize, className = '' } = props;
  const controlSize = useControlSize(size);
  const { invalid, describedBy } = useFieldControl();
  const inputRef = useRef<HTMLInputElement>(null);
  const labelledBy = helpLabelId(help, label, `checkbox-${useId()}`, ariaLabel);
  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);
  return (
    <label className={`checkbox control-size--${controlSize}${labelSize ? ` label-size--${labelSize}` : ''}${disabled ? ' checkbox--disabled' : ''}${className ? ` ${className}` : ''}`}>
      <input
        ref={inputRef}
        type="checkbox"
        className="checkbox__input"
        checked={checked}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-labelledby={labelledBy}
        aria-invalid={invalid ? true : undefined}
        aria-describedby={describedBy}
        onChange={(e) => onChange(e.target.checked)}
      />
      <CheckboxText id={labelledBy} label={label} help={help} />
    </label>
  );
};

export { Checkbox };
