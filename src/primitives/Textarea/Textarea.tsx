/* @layer renderer-components @kind component */
import { forwardRef } from 'react';
import { useFieldControl } from '../Field/behavior/useFieldControl';
import '../../theme/field-surface.css';
import './Textarea.css';
import { type TextareaProps } from './Textarea.type';

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  const { className = '', id, invalid, 'aria-describedby': ownDescribedBy, ...rest } = props;
  const { id: controlId, describedBy, invalid: fieldInvalid } = useFieldControl(id, ownDescribedBy);
  const ariaInvalid = (invalid ?? fieldInvalid) === true || undefined;

  return (
    <textarea
      id={controlId}
      aria-describedby={describedBy}
      aria-invalid={ariaInvalid}
      className={`textarea ${className}`}
      ref={ref}
      {...rest}
    />
  );
});

Textarea.displayName = 'Textarea';

export {
  Textarea,
};
