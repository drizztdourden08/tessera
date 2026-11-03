/* @layer renderer-components @kind component */
import { Fragment } from 'react';
import { gridCellBind } from '../behavior/grid-cell-bind';
import { GridCell } from './GridCell';
import { GridTrailing } from './GridTrailing';
import type { GridTilesProps } from './GridTiles.type';

const GridTiles = <T,>(props: GridTilesProps<T>) => {
  const { model, row, getKey, renderItem, renderTile, trailing, density } = props;
  const bare = renderTile !== undefined || density === 'swatch';
  const trailingBare = typeof trailing === 'function';
  return Array.from({ length: row.size }, (_, offset) => {
    const at = row.first + offset;
    const item = model.flat[at];
    const key = item === undefined ? undefined : getKey(item, at);
    const stop = row.stop + offset;
    const bind = gridCellBind({
      index: stop, column: offset, itemKey: key, tabbable: stop === model.tabbable, bare: item === undefined ? trailingBare : bare,
      extras: key === undefined ? undefined : model.extrasOf(at, key), onActivate: model.activate, onKeyDown: (event) => model.cellKeys(event, stop, at),
    });
    if (item === undefined) return <GridTrailing key="trailing" trailing={trailing} bind={bind} />;
    return renderTile ? <Fragment key={key}>{renderTile(item, at, bind)}</Fragment> : <GridCell key={key} bind={bind}>{renderItem?.(item, at)}</GridCell>;
  });
};

export { GridTiles };
