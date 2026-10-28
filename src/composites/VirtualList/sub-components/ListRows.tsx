/* @layer renderer-components @kind component */
import { VirtualItem } from './VirtualItem';
import type { ListRowsProps } from './ListRows.type';

const ListRows = <T,>(props: ListRowsProps<T>) => {
  const { items, model, renderItem } = props;
  const { select, selecting } = model;
  return model.indices.map((at) => {
    const item = items[at];
    const key = model.keys[at];
    if (item === undefined || key === undefined) return null;
    return (
      <VirtualItem
        key={key}
        index={at}
        count={items.length}
        tabbable={at === model.tabbable}
        selected={selecting ? select.isSelected(key) : undefined}
        itemKey={key}
        onActivate={model.activate}
        onKeyDown={(event) => {
          if (selecting) select.onKeyDown(event, key);
          model.navigate(event, at);
        }}
        onPick={selecting ? (event) => select.click(key, event) : undefined}
      >
        {renderItem(item, at)}
      </VirtualItem>
    );
  });
};

export { ListRows };
