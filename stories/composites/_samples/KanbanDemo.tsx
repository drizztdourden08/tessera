/* @layer stories @kind component */
import { useState } from 'react';
import { KanbanBoard, moveCard } from '../../../src/composites';
import { Box } from '../../../src/primitives';
import { TASK_COLUMNS } from './kanban-board.constants';
import type { KanbanDemoProps, Task } from './kanban-board.type';
import { TaskCard } from './TaskCard';

const KanbanDemo = ({ width = 'full', folded = 'none', emptyReview = false }: KanbanDemoProps) => {
  const [columns, setColumns] = useState(() => TASK_COLUMNS.map((column) => (emptyReview && column.id === 'review' ? { ...column, cards: [] } : column)));
  return (
    <Box className={`kanban-story__frame kanban-story__frame--${width}`}>
      <KanbanBoard<Task>
        label="Sprint 12"
        columns={columns}
        cardLabel={(task) => task.title}
        renderCard={(task) => <TaskCard task={task} />}
        onMove={(move) => setColumns((now) => moveCard(now, move))}
        defaultCollapsed={folded === 'none' ? [] : [folded]}
      />
    </Box>
  );
};

export { KanbanDemo };
