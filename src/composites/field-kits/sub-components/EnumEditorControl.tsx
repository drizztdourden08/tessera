/* @layer renderer-components @kind component */
import type { ReactNode } from 'react';
import { SegmentedControl } from '../../../primitives/SegmentedControl';
import { Select } from '../../../primitives/Select';
import { withCurrentValue } from '../open-set';
import { toText } from '../to-text';
import { SEGMENT_MAX, TAG_MAX } from './EnumEditorControl.constants';
import { EnumTagSelect } from './EnumTagSelect';
import { OpenSetControl } from './OpenSetControl';
import type { EditorControlProps } from '../registry.type';
import type { SegmentOption } from '../../../primitives/SegmentedControl';
import type { SelectOption } from '../../../primitives/Select';
import type { ClosedSetProps } from './EnumEditorControl.type';

const optionsOf = (options: readonly string[] | undefined): SelectOption[] =>
  (options ?? []).map((option) => ({ value: option, label: option }));

const segmentsOf = (options: readonly string[]): SegmentOption[] =>
  options.map((option) => ({ value: option, label: option }));

const closedSetControl = (props: ClosedSetProps): ReactNode => {
  const { field, options, current, disabled, onChange } = props;

  if (options.length > 0 && options.length <= SEGMENT_MAX) {
    return (
      <SegmentedControl
        value={current}
        options={segmentsOf(options)}
        disabled={disabled}
        onChange={onChange}
        onDeselect={field.optional ? () => onChange('') : undefined}
      />
    );
  }

  if (options.length > 0 && options.length <= TAG_MAX) {
    return (
      <EnumTagSelect
        id={field.path}
        options={options}
        selected={current ? [current] : []}
        disabled={disabled}
        single
        onChange={(selected) => {
          const [next] = selected;
          if (next !== undefined || field.optional) onChange(next ?? '');
        }}
      />
    );
  }

  return (
    <Select
      value={current}
      options={optionsOf(options)}
      placeholder={field.label}
      disabled={disabled}
      onChange={onChange}
    />
  );
};

const EnumEditorControl = (props: EditorControlProps) => {
  const { field, value, onChange, disabled } = props;
  const current = toText(value);
  const options = withCurrentValue(field.options ?? [], current);
  const control = closedSetControl({ field, options, current, disabled, onChange });
  if (field.closed) return control;

  return (
    <OpenSetControl
      current={current}
      label={field.label}
      disabled={disabled}
      onSubmit={onChange}
    >
      {control}
    </OpenSetControl>
  );
};

export { EnumEditorControl };
