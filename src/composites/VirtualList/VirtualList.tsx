/* @layer renderer-components @kind component */
import { useImperativeHandle, useMemo } from 'react';
import { Box } from '../../primitives/Box';
import { mergeRefs } from '../../primitives/dom/merge-refs';
import { DragGhost } from '../DragGhost';
import { listBodyProps } from './behavior/list-body-props';
import { listBodyStyle } from './behavior/list-body-style';
import { listScrollMark } from './behavior/list-scroll-mark';
import { listSizing } from './behavior/list-sizing';
import { listStyle } from './behavior/list-style';
import { useVirtualList } from './behavior/useVirtualList';
import { ListRows } from './sub-components/ListRows';
import type { VirtualListProps } from './VirtualList.type';
import '../../theme/virtual-box.css';
import '../../theme/visually-hidden.css';
import './VirtualList.css';

const VirtualList = <T,>(props: VirtualListProps<T>) => {
  const { items, getKey, renderItem, renderOption, label, orientation = 'vertical', rowSize = 'normal', rowHeight, overscan, selection, getLabel } = props;
  const { itemSize, itemSizeKey, endGutter = 0, current, ownsKey, reorder } = props;
  const { onActiveChange, scrollRef, bind, overlay, ref, className, onPick, scrollParent, initialFocusIndex } = props;
  const { sizeOf, itemToken, sizeKey } = listSizing({ orientation, rowSize, rowHeight, itemSize });
  const model = useVirtualList({ items, getKey, overscan, selection, getLabel, axis: orientation, onActiveChange, sizeKey, sizeOf, sizeOfKey: itemSizeKey, reorder, scrollParent, initialFocusIndex });
  const rootRef = useMemo(() => mergeRefs(model.rootRef, scrollRef), [model.rootRef, scrollRef]);
  useImperativeHandle(ref, () => ({ scrollToIndex: model.scrollToIndex, getRects: model.getRects }), [model.scrollToIndex, model.getRects]);
  const classes = ['virtual-box', 'virtual-list', className].filter(Boolean).join(' ');
  const sized = listBodyStyle(items.length, endGutter, model.variable ? model.layout.total : undefined);

  return (
    <Box
      ref={rootRef}
      className={classes}
      style={listStyle(orientation, rowHeight, itemToken)}
      data-row-size={rowSize}
      data-orientation={orientation}
      data-variable={model.variable || undefined}
      data-scroll-parent={listScrollMark(scrollParent)}
      onScroll={model.onScroll}
      {...bind}
    >
      <Box
        ref={model.bodyRef}
        {...listBodyProps(model.selecting, orientation)}
        aria-label={label}
        className="virtual-list__body"
        style={sized}
        onFocus={model.onFocus}
        onBlur={model.onBlur}
      >
        <ListRows items={items} model={model} renderItem={renderItem} renderOption={renderOption} current={current} ownsKey={ownsKey} onPick={onPick} />
      </Box>
      {overlay}
      {model.moving.ghost && <DragGhost count={model.moving.ghost.count} thumbnails={model.moving.ghost.thumbnails} point={model.moving.ghost.point} />}
      {model.moving.active && <Box className="visually-hidden" aria-live="polite">{model.moving.message}</Box>}
    </Box>
  );
};

export { VirtualList };
