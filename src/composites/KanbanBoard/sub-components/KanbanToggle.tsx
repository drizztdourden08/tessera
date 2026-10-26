/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { CHEVRON_SIZE } from '../KanbanBoard.constants';
import type { KanbanToggleProps } from '../KanbanBoard.type';

const KanbanToggle = ({ columnId, title, collapsed, controls, onToggle }: KanbanToggleProps) => {
  const { kanbanBoard } = useTesseraStrings();
  return (
    <IconButton
      label={collapsed ? kanbanBoard.expand(title) : kanbanBoard.collapse(title)}
      aria-expanded={!collapsed}
      aria-controls={controls}
      className="kanban__toggle"
      onClick={() => onToggle(columnId)}
      data-board-toggle={columnId}
    >
      <Icon name={collapsed ? 'chevron-right' : 'chevron-left'} size={CHEVRON_SIZE} />
    </IconButton>
  );
};

export { KanbanToggle };
