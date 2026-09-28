/* @layer renderer-components @kind component */
import { forwardRef } from 'react';
import { useFieldControl } from '../Field/behavior/useFieldControl';
import '../../theme/field-surface.css';
import './Textarea.css';
import { type TextareaProps } from './Textarea.type';

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  const { className = '', id, 'aria-describedby': ownDescribedBy, ...rest } = props;
  const control = useFieldControl(id, ownDescribedBy);

  return <textarea ref={ref} className={`textarea ${className}`} id={control.id} aria-describedby={control.describedBy} {...rest} />;
});

Textarea.displayName = 'Textarea';

export {
  Textarea,
};
