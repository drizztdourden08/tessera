/* @layer renderer-components @kind component */
import { Field } from '../../../primitives/Field';
import { TextInput } from '../../../primitives/TextInput';
import { Textarea } from '../../../primitives/Textarea';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { useInlineEditField } from '../behavior/useInlineEditField';
import { MULTILINE_ROWS } from '../InlineEdit.constants';
import type { InlineEditFieldProps } from '../InlineEdit.type';

const InlineEditField = (props: InlineEditFieldProps) => {
  const { name, value, placeholder, validate, multiline, size, className, onCommit, onDone } = props;
  const { inlineEdit } = useTesseraStrings();
  const state = useInlineEditField({ value, validate, multiline, onCommit, onDone });
  const shared = {
    autoFocus: true,
    value: state.draft,
    placeholder,
    'aria-label': inlineEdit.edit(name),
    onKeyDown: state.onKeyDown,
    onBlur: state.onBlur,
    onFocus: (event: { target: { select: () => void } }) => event.target.select(),
  };
  return (
    <Field error={state.error} width="full" size={size} className={className}>
      {multiline
        ? <Textarea {...shared} rows={MULTILINE_ROWS} onChange={(event) => state.setDraft(event.target.value)} />
        : <TextInput {...shared} onChange={(event) => state.setDraft(event.target.value)} />}
    </Field>
  );
};

export { InlineEditField };
