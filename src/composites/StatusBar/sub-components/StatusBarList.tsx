/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { StatusBarItem } from './StatusBarItem';
import type { StatusBarListProps } from './StatusBarList.type';

const StatusBarList = (props: StatusBarListProps) => {
  const { items, side } = props;
  if (items.length === 0) return null;
  return (
    <Box as="dl" className="status-bar__list" data-side={side}>
      {items.map((item) => <StatusBarItem key={item.id} item={item} />)}
    </Box>
  );
};

export { StatusBarList };
