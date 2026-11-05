/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import type { KanbanCardData, KanbanGroupFrameProps } from '../KanbanBoard.type';
import './KanbanGroupFrame.css';

const KanbanGroupFrame = <Item extends KanbanCardData>({ group, column, listId, shared }: KanbanGroupFrameProps<Item>) => {
  const fold = { open: !shared.foldedGroups.includes(group), toggle: () => shared.onGroupToggle(group), controls: listId };
  return <Box className="kanban__group-bar">{shared.renderGroupHeader?.(group, column, fold)}</Box>;
};

export { KanbanGroupFrame };
