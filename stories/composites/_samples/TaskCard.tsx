/* @layer stories @kind component */
import { Box, Tag, Text } from '../../../src/primitives';
import type { Task, TaskTag } from './kanban-board.type';

const TAG_COLOR = { bug: 'rose', design: 'violet', docs: 'teal', api: 'blue' } as const satisfies Record<TaskTag, string>;

const TaskCard = ({ task }: { task: Task }) => (
  <Box className="kanban-story__task">
    <Text>{task.title}</Text>
    <Box className="kanban-story__tags">
      {task.tags.map((tag) => <Tag key={tag} variant="category" color={TAG_COLOR[tag]}>{tag}</Tag>)}
    </Box>
  </Box>
);

export { TaskCard };
