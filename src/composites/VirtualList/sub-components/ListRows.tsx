/* @layer renderer-components @kind component */
import { listCellBind } from '../behavior/list-cell-bind';
import { listCellExtras } from '../behavior/list-cell-extras';
import { listKeyDown } from '../behavior/list-key-down';
import { listPlace } from '../behavior/list-place';
import { VirtualItem } from './VirtualItem';
import type { ListRowsProps } from './ListRows.type';

const ListRows = <T,>(props: ListRowsProps<T>) => {
  const { items, model, renderItem, renderOption, current, ownsKey } = props;
  const { select, selecting } = model;
  return model.indices.map((at) => {
    const item = items[at];
    const key = model.keys[at];
    if (item === undefined || key === undefined) return null;
    const bind = listCellBind({
      index: at,
      count: items.length,
      itemKey: key,
      tabbable: at === model.tabbable,
      selected: selecting ? select.isSelected(key) : undefined,
      current: key === current,
      bare: renderOption !== undefined,
      extras: listCellExtras({ key, index: at, select, moving: model.moving, selecting }),
      onActivate: model.activate,
      onKeyDown: listKeyDown({ model, index: at, itemKey: key, ownsKey }),
    });
    return (
      <VirtualItem key={key} bind={bind} place={listPlace(model.layout, at, model.variable)} slot={renderOption !== undefined}>
        {renderOption ? renderOption(item, at, bind) : renderItem?.(item, at)}
      </VirtualItem>
    );
  });
};

export { ListRows };
