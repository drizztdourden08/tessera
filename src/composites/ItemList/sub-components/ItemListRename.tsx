/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { useNameEdit } from '../../../primitives/field-control/useNameEdit';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { TextInput } from '../../../primitives/TextInput';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { ItemListRenameProps } from '../ItemList.type';

const ItemListRename = (props: ItemListRenameProps) => {
  const { id, name, data, onEnd } = props;
  const { lists } = useTesseraStrings();
  const undo = () => onEnd(id, null);
  const edit = useNameEdit({ name, onKeep: (next) => onEnd(id, next === name ? null : next), onUndo: undo });
  return (
    <Box className="item-list__rename" role="listitem" {...data}>
      <TextInput
        className="item-list__rename-input"
        aria-label={lists.newName}
        value={edit.draft}
        onChange={(event) => edit.setDraft(event.target.value)}
        onKeyDown={edit.onKeyDown}
        onFocus={(event) => event.target.select()}
        autoFocus
      />
      <IconButton size="sm" variant="primary" label={lists.keepName} title={lists.keepName} disabled={!edit.ready} onClick={edit.keep}>
        <Icon name="check" />
      </IconButton>
      <IconButton size="sm" variant="ghost" label={lists.cancelRename} title={lists.cancelRename} onClick={undo}>
        <Icon name="x" />
      </IconButton>
    </Box>
  );
};

export { ItemListRename };
