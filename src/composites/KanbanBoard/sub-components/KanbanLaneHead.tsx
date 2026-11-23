/* @layer renderer-components @kind component */
import { Flex } from '../../../primitives/Flex';
import { SectionHeader } from '../../../primitives/SectionHeader';
import { tagHueClass } from '../../../primitives/tag-hue/tag-hue-class';
import type { KanbanCardData, KanbanLaneHeadProps } from '../KanbanBoard.type';

const KanbanLaneHead = <Item extends KanbanCardData>({ column, toggle }: KanbanLaneHeadProps<Item>) => {
  const { title, header, cards, badge, action, accent } = column;
  const classes = ['kanban__head', header == null ? '' : 'kanban__head--node', accent === undefined ? '' : `kanban__head--accent ${tagHueClass(accent)}`].filter(Boolean).join(' ');
  return (
    <SectionHeader title={header ?? title} count={cards.length} badge={badge} action={action == null ? toggle : <Flex gap="xs" align="center">{action}{toggle}</Flex>} className={classes} />
  );
};

export { KanbanLaneHead };
