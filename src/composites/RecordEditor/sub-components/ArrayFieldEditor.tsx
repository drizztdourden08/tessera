/* @layer renderer-components @kind component */
import { Flex } from '../../../primitives/Flex';
import { Text } from '../../../primitives/Text';
import { toList } from '../../field-kits/to-list';
import { toText } from '../../field-kits/to-text';
import { countLabel } from '../../field-kits/count-label';
import { resolveFieldKit } from '../../field-kits';
import { replacedAt } from '../../field-kits/list-edits';
import { AddItemButton } from '../../field-kits/sub-components/AddItemButton';
import { EnumTagSelect } from '../../field-kits/sub-components/EnumTagSelect';
import { ListItemControls } from '../../field-kits/sub-components/ListItemControls';
import { blankFor } from '../../field-kits/blank-for';
import { isTagsField } from '../behavior/tag-field';
import { ADD } from './ArrayFieldEditor.constants';
import { TagArrayEditor } from './TagArrayEditor';
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';
import type { ArrayFieldEditorProps } from '../RecordEditor.type';
import '../../../theme/record-editor.css';

const closedSetOf = (element: FieldDescriptor): readonly string[] | undefined =>
  element.kind === 'enum' && element.options?.length ? element.options : undefined;

const ArrayFieldEditor = (props: ArrayFieldEditorProps) => {
  const { field, value, binding } = props;
  const element = field.of;
  const kit = element ? resolveFieldKit(element.kind) : undefined;
  if (!element || !kit) return null;
  if (isTagsField(field)) return <TagArrayEditor field={field} value={value} binding={binding} />;

  const list = toList(value);
  const { disabled } = binding;
  const write = (next: readonly unknown[]): void => binding.onChange(field.path, next);
  const ElementControl = kit.EditorControl;
  const closedSet = closedSetOf(element);

  if (closedSet) {
    return (
      <EnumTagSelect
        id={field.path}
        options={closedSet}
        selected={list.map(toText)}
        disabled={disabled}
        onChange={(selected) => write([...selected])}
      />
    );
  }

  return (
    <Flex className="record-editor__array" direction="column" gap="xs">
      {!list.length && <Text variant="caption" className="record-editor__empty">{countLabel(0)}</Text>}
      {list.map((entry, index) => (
        <Flex key={`${field.path}.${index}`} className="record-editor__array-row" gap="xs" align="center">
          <ElementControl
            field={element}
            value={entry}
            disabled={disabled}
            resolveIdRefOptions={binding.resolveIdRefOptions}
            onChange={(next) => write(replacedAt(list, index, next))}
          />
          <ListItemControls list={list} index={index} disabled={disabled} onChange={write} />
        </Flex>
      ))}
      <AddItemButton label={ADD} disabled={disabled} onAdd={() => write([...list, blankFor(element)])} />
    </Flex>
  );
};

export { ArrayFieldEditor };
