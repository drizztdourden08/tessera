/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Button } from '../../../primitives/Button';
import { Icon } from '../../../primitives/Icon';
import { Text } from '../../../primitives/Text';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { ManagedListHeadProps } from '../ManagedList.type';

const ManagedListHead = (props: ManagedListHeadProps) => {
  const { title, shown, total, onCreate, createLabel } = props;
  const { lists } = useTesseraStrings();
  return (
    <Box className="managed-list__head">
      <Text as="h3" variant="body" className="managed-list__title">{lists.count(title, shown, total)}</Text>
      {onCreate && (
        <Button size="sm" variant="primary" icon={<Icon name="plus" />} onClick={onCreate}>{createLabel ?? lists.newItem}</Button>
      )}
    </Box>
  );
};

export { ManagedListHead };
