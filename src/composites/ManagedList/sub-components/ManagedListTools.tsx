/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { ConfirmIconButton } from '../../ConfirmIconButton';
import type { ManagedListToolsProps } from '../ManagedList.type';

const ManagedListTools = (props: ManagedListToolsProps) => {
  const { id, name, onStartRename, onDelete } = props;
  const { lists } = useTesseraStrings();
  return (
    <Box className="managed-list__tools">
      {onStartRename && (
        <IconButton size="sm" variant="ghost" label={lists.rename(name)} title={lists.rename(name)} onClick={() => onStartRename(id)}>
          <Icon name="pencil" />
        </IconButton>
      )}
      {onDelete && (
        <ConfirmIconButton
          icon={<Icon name="trash-2" />}
          label={lists.deleteNamed(name)}
          confirmLabel={lists.deleteConfirm}
          cancelLabel={lists.deleteCancel}
          placement="end"
          onConfirm={() => onDelete(id)}
        />
      )}
    </Box>
  );
};

export { ManagedListTools };
