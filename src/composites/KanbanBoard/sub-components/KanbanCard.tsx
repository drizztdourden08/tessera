/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Card } from '../../../primitives/Card';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { GRIP_ICON_SIZE, MOVE_KEYS, NO_END } from '../KanbanBoard.constants';
import type { KanbanCardData, KanbanCardProps } from '../KanbanBoard.type';
import './KanbanCard.css';

const KanbanCard = <Item extends KanbanCardData>({ card, slot, last, shared }: KanbanCardProps<Item>) => {
  const { kanbanBoard } = useTesseraStrings();
  const { drag, grip, cardLabel, cardEdgeTone, renderCard, onCardKeyDown } = shared;
  return (
    <Box
      as="li"
      className="kanban__item"
      data-reorder-index={slot}
      data-reorder-key={card.id}
      data-drop={last ? 'after' : drag.dropMark(slot, NO_END)}
    >
      <Card className="kanban__card" edgeTone={cardEdgeTone?.(card)} data-dragging={drag.dragging === slot ? 'yes' : undefined}>
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
