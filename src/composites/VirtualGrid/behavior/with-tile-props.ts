/* @layer renderer-components @kind logic */
import type { VirtualGridCellBind, VirtualGridTileProps } from '../VirtualGrid.type';

const withTileProps = (bind: VirtualGridCellBind, extra: VirtualGridTileProps): VirtualGridCellBind => {
  const { className, data } = extra;
  const next: VirtualGridCellBind = { ...bind, className: className ? `${bind.className} ${className}` : bind.className };
  for (const [name, value] of Object.entries(data ?? {})) next[`data-${name}`] = value;
  return next;
};

export { withTileProps };
