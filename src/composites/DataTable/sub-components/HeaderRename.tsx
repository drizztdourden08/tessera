/* @layer renderer-components @kind component */
import { useNameEdit } from '../../../primitives/field-control/useNameEdit';
import { TextInput } from '../../../primitives/TextInput';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { HeaderRenameProps } from './HeaderRename.type';

const HeaderRename = ({ label, name, onKeep, onUndo }: HeaderRenameProps) => {
  const { common } = useTesseraStrings();
  const edit = useNameEdit({ name, onKeep, onUndo, allowEmpty: true });
  return (
    <TextInput
      autoFocus
      value={edit.draft}
      className="data-table__rename"
      aria-label={common.renameNamed(label)}
      onChange={(event) => edit.setDraft(event.target.value)}
      onKeyDown={edit.onKeyDown}
      onBlur={edit.onBlur}
    />
  );
};

export { HeaderRename };
