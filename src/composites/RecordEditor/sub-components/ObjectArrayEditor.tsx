/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Flex } from '../../../primitives/Flex';
import { Span } from '../../../primitives/text-elements';
import { toList } from '../../field-kits/to-list';
import { blankValue } from '../../field-kits/blank-value';
import { ListItemControls } from '../../field-kits/sub-components/ListItemControls';
import { elementFields } from '../behavior/array-elements';
import { ArrayEditorShell } from './ArrayEditorShell';
import { EditorRow } from './EditorRow';
import type { ObjectArrayEditorProps } from '../RecordEditor.type';
import '../../../theme/record-editor.css';

const ObjectArrayEditor = (props: ObjectArrayEditorProps) => {
  const { field, value, binding, depth } = props;
  const element = field.of;
  if (!element?.children?.length) return null;

  const list = toList(value);
  const { disabled } = binding;
  const write = (next: readonly unknown[]): void => binding.onChange(field.path, next);

  return (
    <ArrayEditorShell isEmpty={!list.length} disabled={disabled} onAdd={() => write([...list, blankValue(element)])}>
      {list.map((_entry, index) => (
        <Box key={`${field.path}.${index}`} className="record-editor__array-item">
          <Flex className="record-editor__array-item-head" gap="xs" align="center">
            <Span tone="muted" className="record-editor__array-index">{`#${index + 1}`}</Span>
            <ListItemControls list={list} index={index} disabled={disabled} onChange={write} />
          </Flex>
          <Box className="record-editor__nested">
            {elementFields(field, index).map((child) => (
              <EditorRow key={child.path} field={child} binding={binding} depth={depth + 1} />
            ))}
          </Box>
        </Box>
      ))}
    </ArrayEditorShell>
  );
};

export { ObjectArrayEditor };
