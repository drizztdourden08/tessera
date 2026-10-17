/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { ItemListRenamePenProps } from '../ItemList.type';

const ItemListRenamePen = ({ id, name, tabIndex, onStartRename }: ItemListRenamePenProps) => {
  const { common } = useTesseraStrings();
  const label = common.renameNamed(name);
  return (
    <IconButton size="sm" variant="ghost" label={label} title={label} tabIndex={tabIndex} onClick={() => onStartRename(id)}>
      <Icon name="pencil" />
    </IconButton>
  );
};

export { ItemListRenamePen };
