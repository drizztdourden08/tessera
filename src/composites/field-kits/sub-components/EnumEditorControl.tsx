/* @layer renderer-components @kind component */
import { controlName } from '../../../primitives/field-control/control-name';
import { declaredValue } from '../declared-value';
import { withCurrentValue } from '../open-set';
import { optionLabelOf } from '../option-label';
import { toText } from '../to-text';
import { ClosedSetPicker } from './ClosedSetPicker';
import { OpenSetControl } from './OpenSetControl';
import type { EditorControlProps } from '../registry.type';

const EnumEditorControl = (props: EditorControlProps) => {
  const { field, value, onChange, disabled } = props;
  const current = toText(value);
  const options = withCurrentValue(field.options ?? [], current);
  const commit = (next: unknown): void => {
    const text = toText(next);
    onChange(text === '' ? '' : declaredValue(field, text));
  };
  const control = (
    <ClosedSetPicker
      {...controlName(props)}
      field={field}
      options={options}
      labelOf={optionLabelOf(field)}
      current={current}
      disabled={disabled}
      onChange={commit}
    />
  );
  if (field.closed) return control;

  return (
    <OpenSetControl current={current} label={field.label} disabled={disabled} onSubmit={commit}>
      {control}
    </OpenSetControl>
  );
};

export { EnumEditorControl };
