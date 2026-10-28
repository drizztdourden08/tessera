/* @layer renderer-components @kind component */
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { useInlineEditing } from './behavior/useInlineEditing';
import type { InlineEditProps } from './InlineEdit.type';
import { InlineEditField } from './sub-components/InlineEditField';
import { InlineEditView } from './sub-components/InlineEditView';

const InlineEdit = (props: InlineEditProps) => {
  const { value, onCommit, label, placeholder, disabled = false, validate, multiline = false, size, dense = false, renderValue, look = 'field', className } = props;
  const { inlineEdit } = useTesseraStrings();
  const { editing, buttonRef, start, done } = useInlineEditing();
  const name = label ?? (value === '' ? (placeholder ?? inlineEdit.fallbackName) : value);
  if (editing && !disabled) {
    return (
      <InlineEditField
        name={name}
        value={value}
        placeholder={placeholder}
        validate={validate}
        multiline={multiline}
        size={size}
        dense={dense}
        className={className}
        onCommit={onCommit}
        onDone={done}
      />
    );
  }
  return (
    <InlineEditView
      name={name}
      label={label}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      multiline={multiline}
      dense={dense}
      renderValue={renderValue}
      look={look}
      buttonRef={buttonRef}
      className={className}
      onStart={start}
    />
  );
};

export { InlineEdit };
