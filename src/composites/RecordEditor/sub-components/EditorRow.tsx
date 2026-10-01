/* @layer renderer-components @kind component */
import { Field } from '../../../primitives/Field';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { isIdentityField } from '../behavior/identity-field';
import { kitFor } from '../behavior/kit-for';
import { nestedPlanFor } from '../behavior/nested-plan';
import { positionPairOf } from '../behavior/position-shape';
import { ArrayFieldEditor } from './ArrayFieldEditor';
import { EditorNest } from './EditorNest';
import { FieldLabel } from './FieldLabel';
import { NestedArrayEditor } from './NestedArrayEditor';
import { ObjectArrayEditor } from './ObjectArrayEditor';
import { SINGLE_VALUE_KINDS } from './EditorRow.constants';
import { VariantArrayEditor } from './VariantArrayEditor';
import type { ReactNode } from 'react';
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';
import type { NestedPlan } from '../behavior/nested-plan.type';
import type { EditorBinding, EditorRowProps } from '../RecordEditor.type';
import '../../../theme/record-editor.css';

const hasChildren = (field: FieldDescriptor): boolean => Boolean(field.children?.length);

const arrayControlFor = (
  field: FieldDescriptor,
  value: unknown,
  binding: EditorBinding,
  depth: number,
): ReactNode | null => {
  const element = field.of;
  if (field.kind !== 'array' || !element) return null;
  if (SINGLE_VALUE_KINDS.includes(element.kind)) {
    return <ArrayFieldEditor field={field} value={value} binding={binding} />;
  }
  const branched = hasChildren(element);
  if (element.kind === 'object' && branched) {
    return <ObjectArrayEditor field={field} value={value} binding={binding} depth={depth} />;
  }
  if (element.kind === 'union' && branched) {
    return <VariantArrayEditor field={field} value={value} binding={binding} depth={depth} />;
  }
  if (element.kind === 'array') {
    return <NestedArrayEditor field={field} value={value} binding={binding} />;
  }
  return null;
};

const controlFor = (
  field: FieldDescriptor,
  value: unknown,
  binding: EditorBinding,
  depth: number,
): ReactNode => {
  const asList = arrayControlFor(field, value, binding, depth);
  if (asList) return asList;
  const Control = kitFor(field.kind).EditorControl;
  const disabled = binding.disabled || isIdentityField(field.path);
  return (
    <Control
      field={field}
      value={value}
      disabled={disabled}
      resolveIdRefOptions={binding.resolveIdRefOptions}
      bounds={binding.bounds(field.path)}
      onChange={(next) => binding.onChange(field.path, next)}
    />
  );
};

const rowClassName = (changed: boolean, dirty: boolean): string =>
  `record-editor__row${changed ? ' record-editor__row--changed' : ''}${dirty ? ' record-editor__row--dirty' : ''}`;

const EditorRow = (props: EditorRowProps) => {
  const { field, binding, depth } = props;
  const { records } = useTesseraStrings();
  const value = binding.value(field.path);
  const pair = positionPairOf(field);
  const plan: NestedPlan | null = pair
    ? { fields: pair.others }
    : nestedPlanFor(field, value, depth, records);

  if (plan) {
    return <EditorNest field={field} value={value} plan={plan} pair={pair} binding={binding} depth={depth} />;
  }

  const changed = binding.isChanged?.(field.path) ?? false;
  return (
    <Field label={<FieldLabel field={field} />} className={rowClassName(changed, binding.isDirty(field.path))}>
      {controlFor(field, value, binding, depth)}
    </Field>
  );
};

export { EditorRow };
