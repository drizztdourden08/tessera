/* @layer stories @kind component */
import { useState } from 'react';
import { KanbanBoard, moveCard } from '../../../src/composites';
import { Badge, Box, Button } from '../../../src/primitives';
import { TASK_COLUMNS } from './kanban-board.constants';
import type { KanbanDemoProps, Task, TaskColumn } from './kanban-board.type';
import { TaskCard } from './TaskCard';

const withSlots = (column: TaskColumn): TaskColumn => {
  if (column.id === 'todo') {
    return { ...column, badge: <Badge variant="inline" value="quiet" color="info" />, action: <Button size="xs" variant="ghost">Add</Button> };
  }
  return column.id === 'doing' ? { ...column, action: <Button size="xs" variant="ghost">Add</Button> } : column;
};

const KanbanDemo = ({ width = 'full', folded = 'none', emptyReview = false, slots = false }: KanbanDemoProps) => {
  const [columns, setColumns] = useState(() => TASK_COLUMNS.map((column) => (emptyReview && column.id === 'review' ? { ...column, cards: [] } : column)));
  const shown = slots ? columns.map(withSlots) : columns;
  return (
    <Box className={`kanban-story__frame kanban-story__frame--${width}`}>
      <KanbanBoard<Task>
        label="Sprint 12"
        columns={shown}
        cardLabel={(task) => task.title}
        renderCard={(task) => <TaskCard task={task} />}
        onMove={(move) => setColumns((now) => moveCard(now, move))}
        defaultCollapsed={folded === 'none' ? [] : [folded]}
      />
    </Box>
  );
};

export { KanbanDemo };
