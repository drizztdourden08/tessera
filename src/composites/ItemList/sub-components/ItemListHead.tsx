/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Button } from '../../../primitives/Button';
import { disabledReason } from '../../../primitives/field-control/disabled-reason';
import { isDisabled } from '../../../primitives/field-control/is-disabled';
import { ReasonTip } from '../../../primitives/field-control/ReasonTip';
import { Icon } from '../../../primitives/Icon';
import { Text } from '../../../primitives/Text';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { ItemListHeadProps } from '../ItemList.type';

const ItemListHead = (props: ItemListHeadProps) => {
  const { title, shown, total, onNew, newRef, creating, createLabel, createTour, newDisabled } = props;
  const { lists } = useTesseraStrings();
  const off = isDisabled(newDisabled);
  const reason = disabledReason(newDisabled);
  return (
    <Box className="item-list__head">
      <Text as="h3" variant="body" className="item-list__title">{lists.count(title, shown, total)}</Text>
      {onNew && !creating && (
        <ReasonTip reason={reason} stop>
          <Button
            ref={newRef}
            size="sm"
            variant="primary"
            icon={<Icon name="plus" />}
            onClick={off ? undefined : onNew}
            disabled={off && reason === undefined}
            aria-disabled={reason === undefined ? undefined : true}
            aria-description={reason}
            data-tour={createTour}
          >
            {createLabel ?? lists.newItem}
          </Button>
        </ReasonTip>
      )}
    </Box>
  );
};

export { ItemListHead };
