/* @layer renderer-components @kind component */
import { useState } from 'react';
import { Box } from '../../../primitives/Box';
import { Button } from '../../../primitives/Button';
import { useHeldTimeout } from '../../../primitives/dom/useHeldTimeout';
import { Icon } from '../../../primitives/Icon';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { ItemListUndoProps } from '../behavior/item-list-deletes.type';

const ItemListUndo = (props: ItemListUndoProps) => {
  const { id, name, held, undoFor, onUndo, onEnd } = props;
  const { common, lists } = useTesseraStrings();
  const [focused, setFocused] = useState(false);
  useHeldTimeout(held || focused, undoFor, () => onEnd(id));
  return (
    <Box className="item-list__undo" role="status">
      <Button
        size="xs"
        variant="secondary"
        icon={<Icon name="undo-2" />}
        aria-label={lists.undoDeleteOf(name)}
        onClick={() => onUndo(id)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        {common.undo}
      </Button>
    </Box>
  );
};

export { ItemListUndo };
