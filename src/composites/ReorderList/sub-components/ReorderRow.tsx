/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { ListItemRow } from '../../ListItemRow';
import type { ReorderRowProps } from '../ReorderList.type';
import { ReorderGrip } from './ReorderGrip';
import { ReorderToggles } from './ReorderToggles';
import './ReorderRow.css';

const ReorderRow = ({ item, index, total, toggles, selected, tabbable, drag, onSelect, onToggle }: ReorderRowProps) => (
  <Box
    as="li"
    className="reorder-list__item"
    data-reorder-index={index}
    data-reorder-key={item.id}
    data-drop={drag.dropMark(index, total)}
    data-dragging={drag.dragging === index ? 'yes' : undefined}
  >
    <ReorderGrip index={index} drag={drag} />
    <ListItemRow
      className="reorder-list__row"
      name={item.label}
      icon={item.icon && <Icon name={item.icon} size={16} />}
      selected={selected}
      tabIndex={tabbable ? 0 : -1}
      onClick={() => onSelect?.(item.id)}
      action={toggles.length > 0 ? (
        <ReorderToggles name={item.label} toggles={toggles} state={item.toggles} onToggle={(toggleId, next) => onToggle?.(item.id, toggleId, next)} />
      ) : undefined}
    />
  </Box>
);

export { ReorderRow };
