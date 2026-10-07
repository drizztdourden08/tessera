/* @layer renderer-components @kind logic */
import { listItemTracks } from './list-item-tracks';
import { rowClassName } from './row-class-name';
import type { ListItemRowProps, ListItemShape } from '../ListItemRow.type';
import type { RowFrame } from './row-frame.type';

const ownTracks = ({ icon, columns, action }: ListItemRowProps): string =>
  listItemTracks({ icon: icon != null, columns: columns?.length ?? 0, action: action != null });

const rowFrame = (props: ListItemRowProps, list: ListItemShape | null, interactive: boolean): RowFrame => {
  const { action, actionVisibility = 'always', selected = false, className = '', role } = props;
  const inList = list !== null;
  const inline = inList && !list.action && action != null;
  return {
    className: rowClassName({ selected, interactive, inList, inline, shown: actionVisibility === 'always', className }),
    role: role ?? (inList ? 'listitem' : undefined),
    style: inList ? undefined : { gridTemplateColumns: ownTracks(props) },
  };
};

export { rowFrame };
