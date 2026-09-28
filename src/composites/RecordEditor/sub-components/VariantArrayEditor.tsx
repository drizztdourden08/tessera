/* @layer renderer-components @kind component */
import { toList } from '../../field-kits/to-list';
import { blankValue } from '../../field-kits/blank-value';
import { replacedAt } from '../../field-kits/list-edits';
import { keyOf } from '../behavior/key-of';
import { ArrayEditorShell } from './ArrayEditorShell';
import { VariantArrayItem } from './VariantArrayItem';
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';
import type { ObjectArrayEditorProps } from '../RecordEditor.type';
import '../../../theme/record-editor.css';

const blankBranchValue = (branch: FieldDescriptor): unknown => ({ [keyOf(branch)]: blankValue(branch) });

const VariantArrayEditor = (props: ObjectArrayEditorProps) => {
  const { field, value, binding, depth } = props;
  const element = field.of;
  const branches = element?.children ?? [];
  const firstBranch = branches[0];
  if (!element || !firstBranch) return null;

  const list = toList(value);
  const write = (next: readonly unknown[]): void => binding.onChange(field.path, next);

  const setBranch = (index: number, branchKey: string): void => {
    const branch = branches.find((entry) => keyOf(entry) === branchKey);
    if (!branch) return;
    write(replacedAt(list, index, blankBranchValue(branch)));
  };

  return (
    <ArrayEditorShell
      isEmpty={!list.length}
      disabled={binding.disabled}
      onAdd={() => write([...list, blankBranchValue(firstBranch)])}
    >
      {list.map((_entry, index) => (
        <VariantArrayItem
          key={`${field.path}.${index}`}
          element={element}
          address={`${field.path}.${index}`}
          list={list}
          index={index}
          branches={branches}
          binding={binding}
          depth={depth}
          onWrite={write}
          onBranch={setBranch}
        />
      ))}
    </ArrayEditorShell>
  );
};

export { VariantArrayEditor };
