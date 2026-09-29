/* @layer renderer-components @kind component */
import { forwardRef } from 'react';
import { useFieldControl } from '../Field/behavior/useFieldControl';
import '../../theme/field-surface.css';
import { type TextInputProps } from './TextInput.type';

const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const { className = '', id, invalid, 'aria-describedby': ownDescribedBy, ...rest } = props;
  const control = useFieldControl(id, ownDescribedBy);
  const isInvalid = invalid ?? control.invalid ?? false;

  return (
    <input
      ref={ref}
      className={`text-input ${className}`}
      id={control.id}
      aria-describedby={control.describedBy}
      aria-invalid={isInvalid ? true : undefined}
      {...rest}
    />
  );
});

TextInput.displayName = 'TextInput';

export {
  TextInput,
};
