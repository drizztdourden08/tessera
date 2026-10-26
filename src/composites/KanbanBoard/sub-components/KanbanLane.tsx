/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Badge } from '../../../primitives/Badge';
import { Box } from '../../../primitives/Box';
import { Flex } from '../../../primitives/Flex';
import { SectionHeader } from '../../../primitives/SectionHeader';
import { Span } from '../../../primitives/text-elements';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { sizesOf } from '../behavior/sizes-of';
import { slotOf } from '../behavior/slot-of';
import { NO_END } from '../KanbanBoard.constants';
import type { KanbanCardData, KanbanColumnProps } from '../KanbanBoard.type';
import { KanbanCard } from './KanbanCard';
import { KanbanToggle } from './KanbanToggle';
import './KanbanLane.css';

const KanbanLane = <Item extends KanbanCardData>({ column, index, collapsed, shared }: KanbanColumnProps<Item>) => {
  const { kanbanBoard } = useTesseraStrings();
  const listId = useId();
  const { id, title, cards, badge, action } = column;
  const start = slotOf(sizesOf(shared.columns), index, 0);
  const toggle = <KanbanToggle columnId={id} title={title} collapsed={collapsed} controls={collapsed ? undefined : listId} onToggle={shared.onToggle} />;
  const name = kanbanBoard.column(title, cards.length);
  if (collapsed) {
    return (
      <Box role="group" aria-label={name} surface="sunken" className="kanban__rail">
        {toggle}
        <Badge variant="inline" value={cards.length} color="tame" />
        {badge != null && <Box className="kanban__rail-badge">{badge}</Box>}
        <Span className="kanban__rail-title">{title}</Span>
      </Box>
    );
  }
  const endMark = shared.drag.dropMark(start + cards.length, NO_END) === 'before';
  return (
    <Box role="group" aria-label={name} surface="sunken" className="kanban__column">
      <SectionHeader title={title} count={cards.length} badge={badge} action={action == null ? toggle : <Flex gap="xs" align="center">{action}{toggle}</Flex>} className="kanban__head" />
      <Box as="ul" id={listId} aria-label={title} className="kanban__list" data-board-list={id} data-drop={endMark && cards.length === 0 ? 'before' : undefined}>
        {cards.map((card, at) => (
          <KanbanCard key={card.id} card={card} slot={start + at} last={endMark && at === cards.length - 1} shared={shared} />
        ))}
        {cards.length === 0 && <Box as="li" className="kanban__empty">{kanbanBoard.empty}</Box>}
      </Box>
    </Box>
  );
};

export { KanbanLane };
