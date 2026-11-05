/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import type { KanbanCardData, KanbanGroupFrameProps } from '../KanbanBoard.type';
import './KanbanGroupFrame.css';

const KanbanGroupFrame = <Item extends KanbanCardData>({ group, column, shared }: KanbanGroupFrameProps<Item>) => (
  <Box className="kanban__group-bar">{shared.renderGroupHeader?.(group, column)}</Box>
);

export { KanbanGroupFrame };
