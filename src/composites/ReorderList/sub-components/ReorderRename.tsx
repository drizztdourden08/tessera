/* @layer renderer-components @kind component */
import { useNameEdit } from '../../../primitives/field-control/useNameEdit';
import { ItemListNameInput } from '../../ItemList/sub-components/ItemListNameInput';
import { renameResult } from '../behavior/rename-result';
import type { ReorderRenameProps } from '../ReorderList.type';

const ReorderRename = ({ name, onEnd }: ReorderRenameProps) => {
  const undo = () => onEnd(null);
  const edit = useNameEdit({ name, onKeep: (next) => onEnd(renameResult(name, next)), onUndo: undo });
  return <ItemListNameInput edit={edit} size="sm" className="row-rename__input" onBlur={edit.ready ? edit.onBlur : undo} />;
};

export { ReorderRename };
