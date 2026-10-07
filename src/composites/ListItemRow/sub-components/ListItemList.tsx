/* @layer renderer-components @kind component */
import { useId, useMemo } from 'react';
import { Badge } from '../../../primitives/Badge';
import { Box } from '../../../primitives/Box';
import { Text } from '../../../primitives/Text';
import { ListItemContext } from '../behavior/list-item-context';
import { listItemTracks } from '../behavior/list-item-tracks';
import { shapeOfRows } from '../behavior/shape-of-rows';
import type { ListItemListProps } from '../ListItemRow.type';
import './ListItemList.css';

const ListItemList = (props: ListItemListProps) => {
  const { children, label, heading, count, shape, className } = props;
  const headingId = useId();
  const read = shape ?? shapeOfRows(children);
  const tracks = listItemTracks(read);
  const style = useMemo(() => ({ gridTemplateColumns: tracks }), [tracks]);
  const context = useMemo(() => ({ icon: read.icon, columns: read.columns, action: read.action }), [read.icon, read.columns, read.action]);
  const titled = heading !== undefined && heading !== null;
  const list = (
    <Box
      role="list"
      aria-label={label}
      aria-labelledby={titled && label === undefined ? headingId : undefined}
      className={`list-item-list${!titled && className ? ` ${className}` : ''}`}
      style={style}
    >
      <ListItemContext.Provider value={context}>{children}</ListItemContext.Provider>
    </Box>
  );
  if (!titled) return list;
  return (
    <Box className={`list-item-list-group${className ? ` ${className}` : ''}`}>
      <Text variant="overline" id={headingId} className="list-item-list__heading">
        {heading}
        {count !== undefined && <Badge variant="inline" value={count} color="tame" className="list-item-list__count" />}
      </Text>
      {list}
    </Box>
  );
};

export { ListItemList };
