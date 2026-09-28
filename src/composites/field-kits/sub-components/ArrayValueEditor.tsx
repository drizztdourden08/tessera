/* @layer renderer-components @kind component */
import { FieldControlBoundary } from '../../../primitives/Field';
import { Flex } from '../../../primitives/Flex';
import { Text } from '../../../primitives/Text';
import { blankValue } from '../blank-value';
import { countLabel } from '../countLabel';
import { replacedAt } from '../list-edits';
import { resolveFieldKit } from '../resolveFieldKit';
import { toList } from '../toList';
import { toText } from '../toText';
import { AddItemButton } from './AddItemButton';
import { ADD } from './ArrayValueEditor.constants';
import { EnumTagSelect } from './EnumTagSelect';
import { ListItemControls } from './ListItemControls';
import type { EditorControlProps } from '../registry.type';

const ArrayValueEditor = (props: EditorControlProps) => {
  const { field, value, onChange, disabled = false, resolveIdRefOptions } = props;
  const element = field.of;
  const kit = element ? resolveFieldKit(element.kind) : undefined;
  const list = toList(value);
  if (!element || !kit) return <Text className="field-kit__muted">{countLabel(list.length)}</Text>;

  if (element.kind === 'enum' && element.options?.length) {
    return (
      <EnumTagSelect
        id={field.path}
        options={element.options}
        selected={list.map(toText)}
        disabled={disabled}
        onChange={(selected) => onChange([...selected])}
      />
    );
  }

  const ElementControl = kit.EditorControl;
  return (
    <FieldControlBoundary>
    <Flex className="field-kit__list" direction="column" gap="xs">
      {!list.length && <Text className="field-kit__muted">{countLabel(0)}</Text>}
      {list.map((entry, index) => (
        <Flex key={`${field.path}.${index}`} className="field-kit__list-row" gap="xs" align="center">
          <ElementControl
            field={element}
            value={entry}
            disabled={disabled}
            resolveIdRefOptions={resolveIdRefOptions}
            onChange={(next) => onChange(replacedAt(list, index, next))}
          />
          <ListItemControls list={list} index={index} disabled={disabled} onChange={onChange} />
        </Flex>
      ))}
      <AddItemButton label={ADD} disabled={disabled} onAdd={() => onChange([...list, blankValue(element)])} />
    </Flex>
    </FieldControlBoundary>
  );
};

export { ArrayValueEditor };
