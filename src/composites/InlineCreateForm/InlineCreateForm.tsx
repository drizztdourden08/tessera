/* @layer renderer-components @kind component */
import { useState } from 'react';
import { Box } from '../../primitives/Box';
import { TextInput } from '../../primitives/TextInput';
import { Span } from '../../primitives/text-elements';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { InlineCreateActions } from './sub-components/InlineCreateActions';
import type { InlineCreateFormProps } from './InlineCreateForm.type';
import './InlineCreateForm.css';

const InlineCreateForm = (props: InlineCreateFormProps) => {
  const {
    onCreate, onCancel, extraFields, canSubmit = true, error, placeholder, label, defaultValue = '',
    submitLabel, cancelLabel, className = '',
  } = props;
  const { records } = useTesseraStrings();
  const shownPlaceholder = placeholder ?? records.namePlaceholder;
  const [name, setName] = useState(defaultValue);
  const ready = name.trim() !== '' && canSubmit;
  const invalid = error != null;

  const handleSubmit = () => {
    if (ready) onCreate(name.trim());
  };

  return (
    <Box className={`inline-create-form${className ? ` ${className}` : ''}`}>
      <TextInput
        type="text"
        placeholder={shownPlaceholder}
        aria-label={label ?? shownPlaceholder}
        value={name}
        invalid={invalid}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(); }}
        autoFocus
      />
      {extraFields}
      {invalid && <Span tone="danger" role="alert" className="inline-create-form__error">{error}</Span>}
      <InlineCreateActions
        ready={ready}
        onSubmit={handleSubmit}
        onCancel={onCancel}
        submitLabel={submitLabel}
        cancelLabel={cancelLabel}
      />
    </Box>
  );
};

export { InlineCreateForm };
