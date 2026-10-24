/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { useVirtualList } from './behavior/useVirtualList';
import { VirtualItem } from './sub-components/VirtualItem';
import { COUNT_PROPERTY } from './VirtualList.constants';
import type { CSSProperties } from 'react';
import type { VirtualListProps } from './VirtualList.type';
import './VirtualList.css';

const VirtualList = <T,>(props: VirtualListProps<T>) => {
  const { items, getKey, renderItem, label, rowSize = 'normal', overscan, onActiveChange, className } = props;
  const model = useVirtualList({ items, getKey, overscan, onActiveChange });
  const sized = { [COUNT_PROPERTY]: items.length } as CSSProperties;
  const classes = ['virtual-list', className].filter(Boolean).join(' ');

  return (
    <Box ref={model.rootRef} className={classes} data-row-size={rowSize} onScroll={model.onScroll}>
      <Box
        ref={model.bodyRef}
        role="list"
        aria-label={label}
        className="virtual-list__body"
        style={sized}
        onFocus={model.onFocus}
        onBlur={model.onBlur}
      >
        {model.indices.map((at) => {
          const item = items[at];
          if (item === undefined) return null;
          return (
            <VirtualItem
              key={getKey(item, at)}
              index={at}
              count={items.length}
              tabbable={at === model.tabbable}
              onActivate={model.activate}
              onNavigate={model.navigate}
            >
              {renderItem(item, at)}
            </VirtualItem>
          );
        })}
      </Box>
    </Box>
  );
};

export { VirtualList };
