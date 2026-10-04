/* @layer renderer-components @kind component */
import { forwardRef } from 'react';
import { Box } from '../Box';
import { useFieldControl } from '../Field/behavior/useFieldControl';
import { InputAdornmentSlot } from '../field-control/InputAdornmentSlot';
import { useControlSize } from '../field-control/useControlSize';
import '../../theme/control-size.css';
import '../../theme/field-surface.css';
import './TextInput.css';
import { enterKeyDown } from './behavior/enter-key-down';
import { frameClass } from './behavior/frame-class';
import { type TextInputProps } from './TextInput.type';

const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const { className = '', id, invalid, size, start, end, onEnter, onKeyDown, 'aria-describedby': ownDescribedBy, ...rest } = props;
  const control = useFieldControl(id, ownDescribedBy);
  const controlSize = useControlSize(size);
  const isInvalid = invalid ?? control.invalid ?? false;
  const framed = start !== undefined || end !== undefined;
  const locked = rest.disabled === true || rest.readOnly === true;

  const input = (
    <input
      ref={ref}
      className={framed ? 'text-input' : `text-input control-size--${controlSize} ${className}`}
      id={control.id}
      aria-describedby={control.describedBy}
      aria-invalid={isInvalid ? true : undefined}
      {...rest}
      onKeyDown={enterKeyDown(onKeyDown, onEnter)}
    />
  );
  if (!framed) return input;

  return (
    <Box as="span" className={frameClass({ size: controlSize, start: start !== undefined, end: end !== undefined, className })}>
      <InputAdornmentSlot className="text-input-frame__slot text-input-frame__slot--start" adornment={start} size={controlSize} disabled={locked} />
      {input}
      <InputAdornmentSlot className="text-input-frame__slot text-input-frame__slot--end" adornment={end} size={controlSize} disabled={locked} />
    </Box>
  );
});

TextInput.displayName = 'TextInput';

export {
  TextInput,
};
