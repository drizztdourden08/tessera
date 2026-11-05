/* @layer stories @kind component */
import { useState } from 'react';
import { KanbanBoard, RecordCard, moveCard } from '../../../src/composites';
import { Badge, Box, Text } from '../../../src/primitives';
import { TASK_COLUMNS } from './kanban-board.constants';
import type { Task } from './kanban-board.type';

const NEEDS_YOU: readonly string[] = ['login', 'cache'];

const KanbanRecordDemo = () => {
  const [columns, setColumns] = useState(TASK_COLUMNS);
  return (
    <Box className="kanban-story__frame kanban-story__frame--full">
      <KanbanBoard<Task>
        label="Sprint 12"
        columns={columns}
        cardFrame="none"
        cardLabel={(task) => task.title}
        cardEdgeTone={(task) => (NEEDS_YOU.includes(task.id) ? 'danger' : undefined)}
        renderCard={(task, frame) => (
          <RecordCard
            density="row"
            title={task.title}
            code={task.id}
            name={task.id}
            edgeTone={frame.edgeTone}
            content={task.tags.map((tag) => <Badge key={tag} variant="inline" value={tag} color="info" />)}
          >
            <Text>Opened from the board.</Text>
          </RecordCard>
        )}
        onMove={(move) => setColumns((now) => moveCard(now, move))}
      />
    </Box>
  );
};

export { KanbanRecordDemo };
