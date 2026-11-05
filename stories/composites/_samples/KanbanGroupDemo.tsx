/* @layer stories @kind component */
import { useState } from 'react';
import { KanbanBoard, RecordHeader, moveCard } from '../../../src/composites';
import { Badge, Box, TypeMark } from '../../../src/primitives';
import { GROUP_TITLES, withGroups } from './kanban-groups.constants';
import { TASK_COLUMNS } from './kanban-board.constants';
import type { Task, TaskColumn } from './kanban-board.type';
import { TaskCard } from './TaskCard';

const countIn = (column: TaskColumn, group: string): number => column.cards.filter((card) => card.group === group).length;

const KanbanGroupDemo = () => {
  const [columns, setColumns] = useState(() => withGroups(TASK_COLUMNS));
  return (
    <Box className="kanban-story__frame kanban-story__frame--full">
      <KanbanBoard<Task>
        label="Sprint 12"
        columns={columns}
        cardLabel={(task) => task.title}
        renderCard={(task) => <TaskCard task={task} />}
        renderGroupHeader={(group, column, fold) => (
          <RecordHeader
            density="row"
            icon={<TypeMark icon="bookmark" label="Story" color="violet" variant="outline" />}
            code="ARG-7"
            title={GROUP_TITLES[group] ?? group}
            content={<Badge variant="inline" value={countIn(column, group)} color="tame" />}
            chevron={{ expanded: fold.open, onToggle: fold.toggle, controls: fold.controls }}
          />
        )}
        onMove={(move) => setColumns((now) => moveCard(now, move))}
      />
    </Box>
  );
};

export { KanbanGroupDemo };
