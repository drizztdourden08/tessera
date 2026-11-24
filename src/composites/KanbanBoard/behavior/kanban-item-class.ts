/* @layer renderer-components @kind logic */
import { tagHueClass } from '../../../primitives/tag-hue/tag-hue-class';
import type { KanbanCardData, KanbanShared } from '../KanbanBoard.type';

const kanbanItemClass = <Item extends KanbanCardData>(frame: { group: string } | undefined, shared: KanbanShared<Item>): string => {
  const accent = frame === undefined ? undefined : shared.groupAccent?.(frame.group);
  return accent === undefined ? 'kanban__item' : `kanban__item kanban__item--accent ${tagHueClass(accent)}`;
};

export { kanbanItemClass };
