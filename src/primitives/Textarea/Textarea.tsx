/* @layer renderer-components @kind component */
import { forwardRef, useMemo, useRef } from 'react';
import { mergeRefs } from '../dom/merge-refs';
import { useFieldControl } from '../Field/behavior/useFieldControl';
import { useControlSize } from '../field-control/useControlSize';
import '../../theme/control-size.css';
import '../../theme/field-surface.css';
import './Textarea.css';
import { type TextareaProps } from './Textarea.type';
import { useAutoGrow } from './behavior/useAutoGrow';

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  const { className = '', id, invalid, size, resize = 'vertical', look = 'field', autoGrow = false, maxRows, 'aria-describedby': ownDescribedBy, ...rest } = props;
  const controlSize = useControlSize(size);
  const { id: controlId, describedBy, invalid: fieldInvalid } = useFieldControl(id, ownDescribedBy);
  const areaRef = useRef<HTMLTextAreaElement | null>(null);
  const setRef = useMemo(() => mergeRefs(ref, areaRef), [ref]);
  useAutoGrow(areaRef, rest.value, autoGrow, maxRows);
  const ariaInvalid = (invalid ?? fieldInvalid) === true || undefined;
  const classes = ['textarea', `textarea--resize-${autoGrow ? 'none' : resize}`, `textarea--${look}`, autoGrow && 'textarea--grow', `control-size--${controlSize}`, className];

  return (
    <textarea
      id={controlId}
      aria-describedby={describedBy}
      aria-invalid={ariaInvalid}
      className={classes.filter(Boolean).join(' ')}
      ref={setRef}
      {...rest}
    />
  );
});

Textarea.displayName = 'Textarea';

export {
  Textarea,
};
