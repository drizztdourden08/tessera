/* @layer renderer-components @kind component */
import { useId, useState } from 'react';
import { Box } from '../../primitives/Box';
import { Span } from '../../primitives/text-elements';
import { InlineCreateActions } from './sub-components/InlineCreateActions';
import { InlineCreateCompactRow } from './sub-components/InlineCreateCompactRow';
import { InlineCreateName } from './sub-components/InlineCreateName';
import type { InlineCreateFormProps } from './InlineCreateForm.type';
import './InlineCreateForm.css';

const InlineCreateForm = (props: InlineCreateFormProps) => {
  const {
    onCreate, onCancel, extraFields, canSubmit = true, error, placeholder, label, defaultValue = '',
    submitLabel, cancelLabel, compact = false, className = '',
  } = props;
  const [name, setName] = useState(defaultValue);
  const errorId = useId();
  const ready = name.trim() !== '' && canSubmit;
  const invalid = error != null;
  const classes = ['inline-create-form', compact && 'inline-create-form--compact', className].filter(Boolean).join(' ');

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
  const actions = { ready, onSubmit: handleSubmit, onCancel, submitLabel, cancelLabel };

  return compact ? (
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
  );
};

export { InlineCreateForm };
