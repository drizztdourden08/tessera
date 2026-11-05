/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Card } from '../../../primitives/Card';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { GRIP_ICON_SIZE, MOVE_KEYS, NO_END } from '../KanbanBoard.constants';
import type { KanbanCardData, KanbanCardProps } from '../KanbanBoard.type';
import { KanbanGroupFrame } from './KanbanGroupFrame';
import './KanbanCard.css';

const KanbanCard = <Item extends KanbanCardData>({ card, frame, slot, last, shared }: KanbanCardProps<Item>) => {
  const { kanbanBoard } = useTesseraStrings();
  const folded = frame !== undefined && shared.foldedGroups.includes(frame.group);
  const { drag, grip, cardLabel, cardEdgeTone, renderCard, onCardKeyDown, onCardClick } = shared;
  return (
    <Box
      as="li"
      className="kanban__item"
      data-swap-item=""
      data-reorder-index={slot}
      data-reorder-key={card.id}
      data-group={frame?.part}
      data-folded={folded ? 'yes' : undefined}
      data-drop={last ? 'after' : drag.dropMark(slot, NO_END)}
    >
      {(frame?.part === 'first' || frame?.part === 'only') && <KanbanGroupFrame group={frame.group} column={frame.column} listId={frame.listId} shared={shared} />}
      <Card className="kanban__card" edgeTone={cardEdgeTone?.(card)} data-dragging={drag.dragging === slot ? 'yes' : undefined}
        onClick={(event) => onCardClick(event, card)}
      >
        <Box className="kanban__card-row">
          <IconButton
            label={kanbanBoard.move(cardLabel(card))}
            title={kanbanBoard.moveHint}
            aria-keyshortcuts={MOVE_KEYS}
            className="kanban__grip"
            onKeyDown={(event) => onCardKeyDown(event, card)}
            {...(grip ? drag.handlers(slot) : {})}
          >
            <Icon name="grip-vertical" size={GRIP_ICON_SIZE} />
          </IconButton>
          <Box className="kanban__card-body">{renderCard(card)}</Box>
        </Box>
      </Card>
    </Box>
  );
};

export { KanbanCard };
