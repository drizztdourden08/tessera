/* @layer renderer-components @kind component */
import { useEffect, useRef } from 'react';
import { useControlSize } from '../field-control/useControlSize';
import { Span } from '../text-elements';
import '../../theme/control-size.css';
import './Checkbox.css';
import type { CheckboxProps } from './Checkbox.type';

const Checkbox = (props: CheckboxProps) => {
  const { checked, onChange, label, ariaLabel, disabled, indeterminate = false, size, className = '' } = props;
  const controlSize = useControlSize(size);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);
  return (
    <label className={`checkbox control-size--${controlSize}${disabled ? ' checkbox--disabled' : ''}${className ? ` ${className}` : ''}`}>
      <input
        ref={inputRef}
        type="checkbox"
        className="checkbox__input"
        checked={checked}
        disabled={disabled}
        aria-label={ariaLabel}
        onChange={(e) => onChange(e.target.checked)}
      />
      {label != null && <Span tone="dim" className="checkbox__label">{label}</Span>}
    </label>
  );
};

export { Checkbox };
