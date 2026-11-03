/* @layer renderer-components @kind component */
import { Flex } from '../../../primitives/Flex';
import { SectionHeader } from '../../../primitives/SectionHeader';
import type { KanbanCardData, KanbanLaneHeadProps } from '../KanbanBoard.type';

const KanbanLaneHead = <Item extends KanbanCardData>({ column, toggle }: KanbanLaneHeadProps<Item>) => {
  const { title, header, cards, badge, action } = column;
  return (
    <SectionHeader title={header ?? title} count={cards.length} badge={badge} action={action == null ? toggle : <Flex gap="xs" align="center">{action}{toggle}</Flex>} className={header == null ? 'kanban__head' : 'kanban__head kanban__head--node'} />
  );
};

export { KanbanLaneHead };
