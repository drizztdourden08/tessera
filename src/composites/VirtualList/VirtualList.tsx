/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { sizeVariable } from '../virtual/size-variable';
import { useVirtualList } from './behavior/useVirtualList';
import { VirtualItem } from './sub-components/VirtualItem';
import { COUNT_PROPERTY, ROW_PROPERTY } from './VirtualList.constants';
import type { CSSProperties } from 'react';
import type { VirtualListProps } from './VirtualList.type';
import '../../theme/virtual-box.css';
import './VirtualList.css';

const VirtualList = <T,>(props: VirtualListProps<T>) => {
  const { items, getKey, renderItem, label, rowSize = 'normal', rowHeight, overscan, onActiveChange, className } = props;
  const model = useVirtualList({ items, getKey, overscan, onActiveChange, sizeKey: rowHeight ?? rowSize });
  const sized = { [COUNT_PROPERTY]: items.length } as CSSProperties;
  const rootStyle = (rowHeight ? { [ROW_PROPERTY]: sizeVariable(rowHeight) } : undefined) as CSSProperties | undefined;
  const classes = ['virtual-box', 'virtual-list', className].filter(Boolean).join(' ');

  return (
    <Box ref={model.rootRef} className={classes} style={rootStyle} data-row-size={rowSize} onScroll={model.onScroll}>
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
