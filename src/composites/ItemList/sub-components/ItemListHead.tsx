/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Button } from '../../../primitives/Button';
import { Icon } from '../../../primitives/Icon';
import { Text } from '../../../primitives/Text';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { ItemListHeadProps } from '../ItemList.type';

const ItemListHead = (props: ItemListHeadProps) => {
  const { title, shown, total, onNew, newRef, creating, createLabel } = props;
  const { lists } = useTesseraStrings();
  return (
    <Box className="item-list__head">
      <Text as="h3" variant="body" className="item-list__title">{lists.count(title, shown, total)}</Text>
      {onNew && !creating && (
        <Button ref={newRef} size="sm" variant="primary" icon={<Icon name="plus" />} onClick={onNew}>{createLabel ?? lists.newItem}</Button>
      )}
    </Box>
  );
};

export { ItemListHead };
