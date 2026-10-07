/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Box } from '../../../primitives/Box';
import { Button } from '../../../primitives/Button';
import { Text } from '../../../primitives/Text';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { ItemListGroup } from '../ItemList.type';

const ItemListEmptyGroup = ({ name, empty, action }: ItemListGroup) => {
  const { lists } = useTesseraStrings();
  const headingId = useId();
  return (
    <Box className="item-list__group" role="group" aria-labelledby={name ? headingId : undefined}>
      {name && <Text variant="overline" id={headingId}>{name}</Text>}
      <Box className="item-list__group-empty">
        <Text variant="caption" tone="dim">{empty ?? lists.empty}</Text>
        {action && <Button size="sm" variant="secondary" disabled={action.disabled} onClick={action.onSelect}>{action.label}</Button>}
      </Box>
    </Box>
  );
};

export { ItemListEmptyGroup };
