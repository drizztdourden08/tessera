/* @layer renderer-components @kind logic */
import { listItemTracks } from './list-item-tracks';
import { rowClassName } from './row-class-name';
import type { ListItemRowProps } from '../ListItemRow.type';
import type { RowFrame } from './row-frame.type';

const rowFrame = (props: ListItemRowProps, inList: boolean, interactive: boolean): RowFrame => {
  const { icon, columns, action, selected = false, className = '', role } = props;
  const tracks = listItemTracks({ icon: icon != null, columns: columns?.length ?? 0, action: action != null });
  return {
    className: rowClassName(selected, interactive, inList, className),
    role: role ?? (inList ? 'listitem' : undefined),
    style: inList ? undefined : { gridTemplateColumns: tracks },
  };
};

export { rowFrame };
