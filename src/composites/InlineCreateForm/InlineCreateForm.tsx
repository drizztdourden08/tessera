/* @layer renderer-components @kind component */
import { useId, useMemo } from 'react';
import { Box } from '../../primitives/Box';
import { FieldControlContext } from '../../primitives/field-control/field-control-context';
import { useControlSize } from '../../primitives/field-control/useControlSize';
import { useNameEdit } from '../../primitives/field-control/useNameEdit';
import { Span } from '../../primitives/text-elements';
import { InlineCreateActions } from './sub-components/InlineCreateActions';
import { InlineCreateCompactRow } from './sub-components/InlineCreateCompactRow';
import { InlineCreateName } from './sub-components/InlineCreateName';
import type { InlineCreateFormProps } from './InlineCreateForm.type';
import '../../theme/control-size.css';
import './InlineCreateForm.css';

const InlineCreateForm = (props: InlineCreateFormProps) => {
  const {
    onCreate, onCancel, extraFields, canSubmit = true, error, placeholder, label, defaultValue = '',
    submitLabel, cancelLabel, compact = false, size, className = '',
  } = props;
  const edit = useNameEdit({ name: defaultValue, onKeep: onCreate, onUndo: onCancel, canKeep: canSubmit });
  const errorId = useId();
  const controlSize = useControlSize(size);
  const control = useMemo(() => ({ size: controlSize }), [controlSize]);
  const invalid = error != null;
  const classes = ['inline-create-form', `control-size--${controlSize}`, compact && 'inline-create-form--compact', className]
    .filter(Boolean).join(' ');

  const nameInput = (
    <InlineCreateName
      value={edit.draft}
      onChange={edit.setDraft}
      onKeyDown={edit.onKeyDown}
      placeholder={placeholder}
      label={label}
      errorId={invalid ? errorId : undefined}
    />
  );
  const errorLine = invalid && <Span id={errorId} tone="danger" role="alert" className="inline-create-form__error">{error}</Span>;
  const actions = { ready: edit.ready, size: controlSize, onSubmit: edit.keep, onCancel, submitLabel, cancelLabel };

  return (
    <FieldControlContext.Provider value={control}>
      {compact ? (
        <Box className={classes}>
          <InlineCreateCompactRow {...actions}>{nameInput}{extraFields}</InlineCreateCompactRow>
          {errorLine}
        </Box>
      ) : (
        <Box className={classes}>
          {nameInput}
          {extraFields}
          {errorLine}
          <InlineCreateActions {...actions} />
        </Box>
      )}
    </FieldControlContext.Provider>
  );
};

export { InlineCreateForm };
