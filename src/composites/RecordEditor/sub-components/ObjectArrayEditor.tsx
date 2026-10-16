/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { toList } from '../../field-kits/to-list';
import { blankValue } from '../../../data/schema/blank-value/blank-value';
import { ListItemControls } from '../../field-kits/sub-components/ListItemControls';
import { elementFields } from '../behavior/array-elements';
import { ArrayEditorShell } from './ArrayEditorShell';
import { ArrayItemFrame } from './ArrayItemFrame';
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
        <ArrayItemFrame
          key={`${field.path}.${index}`}
          index={index}
          controls={<ListItemControls list={list} index={index} disabled={disabled} onChange={write} />}
        >
          <Box className="record-editor__nested">
            {elementFields(field, index).map((child) => (
              <EditorRow key={child.path} field={child} binding={binding} depth={depth + 1} />
            ))}
          </Box>
        </ArrayItemFrame>
      ))}
    </ArrayEditorShell>
  );
};

export { ObjectArrayEditor };
