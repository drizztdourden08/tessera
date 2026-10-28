/* @layer renderer-components @kind component */
import { useImperativeHandle, useMemo } from 'react';
import { Box } from '../../primitives/Box';
import { mergeRefs } from '../../primitives/dom/merge-refs';
import { listStyle } from './behavior/list-style';
import { useVirtualList } from './behavior/useVirtualList';
import { ListRows } from './sub-components/ListRows';
import { COUNT_PROPERTY } from './VirtualList.constants';
import type { CSSProperties } from 'react';
import type { VirtualListProps } from './VirtualList.type';
import '../../theme/virtual-box.css';
import './VirtualList.css';

const VirtualList = <T,>(props: VirtualListProps<T>) => {
  const { items, getKey, renderItem, label, orientation = 'vertical', rowSize = 'normal', rowHeight, itemSize, overscan, selection, getLabel } = props;
  const { onActiveChange, scrollRef, bind, overlay, ref, className } = props;
  const sizeKey = (orientation === 'horizontal' ? itemSize : rowHeight) ?? rowSize;
  const model = useVirtualList({ items, getKey, overscan, selection, getLabel, axis: orientation, onActiveChange, sizeKey });
  const rootRef = useMemo(() => mergeRefs(model.rootRef, scrollRef), [model.rootRef, scrollRef]);
  useImperativeHandle(ref, () => ({ scrollToIndex: model.scrollToIndex, getRects: model.getRects }), [model.scrollToIndex, model.getRects]);
  const sized = { [COUNT_PROPERTY]: items.length } as CSSProperties;
  const classes = ['virtual-box', 'virtual-list', className].filter(Boolean).join(' ');
  const choosing = model.selecting;

  return (
    <Box ref={rootRef} className={classes} style={listStyle(orientation, rowHeight, itemSize)} data-row-size={rowSize} data-orientation={orientation} onScroll={model.onScroll} {...bind}>
      <Box
        ref={model.bodyRef}
        role={choosing ? 'listbox' : 'list'}
        aria-label={label}
        aria-multiselectable={choosing ? true : undefined}
        aria-orientation={choosing ? orientation : undefined}
        className="virtual-list__body"
        style={sized}
        onFocus={model.onFocus}
        onBlur={model.onBlur}
      >
        <ListRows items={items} model={model} renderItem={renderItem} />
      </Box>
      {overlay}
    </Box>
  );
};

export { VirtualList };
