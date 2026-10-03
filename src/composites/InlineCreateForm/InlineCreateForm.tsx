/* @layer renderer-components @kind component */
import { useId, useMemo, useState } from 'react';
import { Box } from '../../primitives/Box';
import { FieldControlContext } from '../../primitives/field-control/field-control-context';
import { useControlSize } from '../../primitives/field-control/useControlSize';
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
  const [name, setName] = useState(defaultValue);
  const errorId = useId();
  const controlSize = useControlSize(size);
  const control = useMemo(() => ({ size: controlSize }), [controlSize]);
  const ready = name.trim() !== '' && canSubmit;
  const invalid = error != null;
  const classes = ['inline-create-form', `control-size--${controlSize}`, compact && 'inline-create-form--compact', className]
    .filter(Boolean).join(' ');

  const handleSubmit = () => {
    if (ready) onCreate(name.trim());
  };

  const nameInput = (
    <InlineCreateName
      value={name}
      onChange={setName}
      onSubmit={handleSubmit}
      placeholder={placeholder}
      label={label}
      errorId={invalid ? errorId : undefined}
    />
  );
  const errorLine = invalid && <Span id={errorId} tone="danger" role="alert" className="inline-create-form__error">{error}</Span>;
  const actions = { ready, size: controlSize, onSubmit: handleSubmit, onCancel, submitLabel, cancelLabel };

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
