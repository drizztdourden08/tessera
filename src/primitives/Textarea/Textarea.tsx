/* @layer renderer-components @kind component */
import { forwardRef } from 'react';
import { useFieldControl } from '../Field/behavior/useFieldControl';
import { useControlSize } from '../field-control/useControlSize';
import '../../theme/control-size.css';
import '../../theme/field-surface.css';
import './Textarea.css';
import { type TextareaProps } from './Textarea.type';

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  const { className = '', id, invalid, size, resize = 'vertical', 'aria-describedby': ownDescribedBy, ...rest } = props;
  const controlSize = useControlSize(size);
  const { id: controlId, describedBy, invalid: fieldInvalid } = useFieldControl(id, ownDescribedBy);
  const ariaInvalid = (invalid ?? fieldInvalid) === true || undefined;

  return (
    <textarea
      id={controlId}
      aria-describedby={describedBy}
      aria-invalid={ariaInvalid}
      className={`textarea textarea--resize-${resize} control-size--${controlSize} ${className}`}
      ref={ref}
      {...rest}
    />
  );
});

Textarea.displayName = 'Textarea';

export {
  Textarea,
};
