/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import { Box } from '../../../primitives/Box';
import { ListItemContext } from '../behavior/list-item-context';
import { listItemTracks } from '../behavior/list-item-tracks';
import { shapeOfRows } from '../behavior/shape-of-rows';
import type { ListItemListProps } from '../ListItemRow.type';
import './ListItemList.css';

const ListItemList = (props: ListItemListProps) => {
  const { children, label, className } = props;
  const tracks = listItemTracks(shapeOfRows(children));
  const style = useMemo(() => ({ gridTemplateColumns: tracks }), [tracks]);
  return (
    <Box role="list" aria-label={label} className={`list-item-list${className ? ` ${className}` : ''}`} style={style}>
      <ListItemContext.Provider value>{children}</ListItemContext.Provider>
    </Box>
  );
};

export { ListItemList };
