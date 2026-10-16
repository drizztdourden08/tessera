/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { ConfirmIconButton } from '../../ConfirmIconButton';
import type { ItemListToolsProps } from '../ItemList.type';

const ItemListTools = (props: ItemListToolsProps) => {
  const { id, name, actions, onStartRename, onDelete, onKeep, undoable, tabIndex } = props;
  const { common, lists } = useTesseraStrings();
  const deleteLabel = lists.deleteNamed(name);
  return (
    <Box className="item-list__tools">
      {actions}
      {onStartRename && (
        <IconButton size="sm" variant="ghost" label={common.renameNamed(name)} title={common.renameNamed(name)} tabIndex={tabIndex} onClick={() => onStartRename(id)}>
          <Icon name="pencil" />
        </IconButton>
      )}
      {onDelete && undoable && (
        <IconButton size="sm" variant="ghost" label={deleteLabel} title={deleteLabel} tabIndex={tabIndex} onClick={() => onDelete(id)}>
          <Icon name="trash-2" />
        </IconButton>
      )}
      {onDelete && !undoable && (
        <ConfirmIconButton
          icon={<Icon name="trash-2" />}
          label={deleteLabel}
          confirmLabel={common.delete}
          cancelLabel={lists.deleteCancel}
          placement="end"
          tabIndex={tabIndex}
          onConfirm={() => onDelete(id)}
          onCancel={onKeep && (() => onKeep(id))}
        />
      )}
    </Box>
  );
};

export { ItemListTools };
