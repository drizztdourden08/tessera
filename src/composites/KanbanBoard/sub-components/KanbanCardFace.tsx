/* @layer renderer-components @kind component */
import type { MouseEvent } from 'react';
import { Box } from '../../../primitives/Box';
import { Card } from '../../../primitives/Card';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { GRIP_ICON_SIZE, MOVE_KEYS } from '../KanbanBoard.constants';
import type { KanbanCardData, KanbanCardFaceProps } from '../KanbanBoard.type';

const KanbanCardFace = <Item extends KanbanCardData>({ card, slot, shared }: KanbanCardFaceProps<Item>) => {
  const { kanbanBoard } = useTesseraStrings();
  const { drag, grip, cardLabel, cardEdgeTone, cardFrame, renderCard, onCardKeyDown, onCardClick } = shared;
  const edgeTone = cardEdgeTone?.(card);
  const surface = { 'data-dragging': drag.dragging === slot ? 'yes' : undefined, onClick: (event: MouseEvent<HTMLElement>) => onCardClick(event, card) };
  const row = (
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
      <Box className="kanban__card-body">{renderCard(card, { edgeTone })}</Box>
    </Box>
  );
  if (cardFrame === 'none') return <Box className="kanban__card kanban__card--bare" {...surface}>{row}</Box>;
  return <Card className="kanban__card" edgeTone={edgeTone} {...surface}>{row}</Card>;
};

export { KanbanCardFace };
