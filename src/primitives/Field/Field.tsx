/* @layer renderer-components @kind component */
import { useId, useMemo } from 'react';
import { FieldControlContext } from '../field-control/field-control-context';
import { useControlSize } from '../field-control/useControlSize';
import { Span } from '../text-elements';
import { FieldNote } from './sub-components/FieldNote';
import '../../theme/control-size.css';
import './Field.css';
import type { FieldProps } from './Field.type';

const Field = (props: FieldProps) => {
  const { label, hint, error, htmlFor, required, inline, size, className = '', children } = props;
  const autoId = useId();
  const controlId = htmlFor ?? `field-${autoId}`;
  const noteId = `${controlId}-note`;
  const labelId = label != null ? `${controlId}-label` : undefined;
  const note = error ?? hint;
  const invalid = error != null;
  const fieldSize = useControlSize(size);
  const control = useMemo(
    () => ({ id: controlId, describedBy: note != null ? noteId : undefined, invalid, labelId, size: fieldSize }),
    [controlId, noteId, note, invalid, labelId, fieldSize],
  );

  return (
    <div className={`field control-size--${fieldSize}${inline ? ' field--inline' : ''}${className ? ` ${className}` : ''}`}>
      {label != null && (
        <label id={labelId} className="field__label" htmlFor={controlId}>
          {label}
          {required && <Span tone="danger" className="field__required">*</Span>}
        </label>
      )}
      <div className="field__control">
        <FieldControlContext.Provider value={control}>{children}</FieldControlContext.Provider>
      </div>
      <FieldNote id={noteId} hint={hint} error={error} />
    </div>
  );
};

export { Field };
