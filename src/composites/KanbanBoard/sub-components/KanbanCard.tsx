/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { NO_END } from '../KanbanBoard.constants';
import type { KanbanCardData, KanbanCardProps } from '../KanbanBoard.type';
import { KanbanCardFace } from './KanbanCardFace';
import { KanbanGroupFrame } from './KanbanGroupFrame';
import './KanbanCard.css';

const KanbanCard = <Item extends KanbanCardData>({ card, frame, slot, last, shared }: KanbanCardProps<Item>) => {
  const folded = frame !== undefined && shared.foldedGroups.includes(frame.group);
  const head = frame?.part === 'first' || frame?.part === 'only' ? frame : undefined;
  return (
    <Box
      as="li"
      className="kanban__item"
      data-swap-item=""
      data-reorder-index={slot}
      data-reorder-key={card.id}
      data-group={frame?.part}
      data-folded={folded ? 'yes' : undefined}
      data-drop={last ? 'after' : shared.drag.dropMark(slot, NO_END)}
    >
      {head && <KanbanGroupFrame group={head.group} column={head.column} listId={head.listId} shared={shared} />}
      <KanbanCardFace card={card} slot={slot} shared={shared} />
    </Box>
  );
};

export { KanbanCard };
