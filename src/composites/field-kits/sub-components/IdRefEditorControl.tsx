/* @layer renderer-components @kind component */
import { toText } from '../toText';
import { IdInput } from './IdInput';
import { NO_OPTIONS } from './IdRefEditorControl.constants';
import { IdRefSelect } from './IdRefSelect';
import type { EditorControlProps, IdRefOption, IdRefOptionResolver } from '../registry.type';
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';

const lookup = (
  field: FieldDescriptor,
  resolve: IdRefOptionResolver | undefined,
): readonly IdRefOption[] =>
  resolve && field.targetKind ? resolve(field.targetKind, field) : NO_OPTIONS;

const IdRefEditorControl = (props: EditorControlProps) => {
  const { field, value, onChange, disabled, resolveIdRefOptions } = props;
  const options = lookup(field, resolveIdRefOptions);
  if (!options.length) {
    return <IdInput placeholder={field.label} value={value} disabled={disabled} onChange={onChange} />;
  }
  return (
    <IdRefSelect
      options={options}
      value={toText(value)}
      placeholder={field.label}
      disabled={disabled}
      onChange={onChange}
    />
  );
};

export { IdRefEditorControl };
