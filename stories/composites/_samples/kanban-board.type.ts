/* @layer stories @kind types */
import type { KanbanCardData, KanbanColumn } from '../../../src/composites';

type TaskTag = 'bug' | 'design' | 'docs' | 'api';

interface Task extends KanbanCardData {
  title: string;
  tags: readonly TaskTag[];
}

type TaskColumn = KanbanColumn<Task>;

type BoardWidth = 'full' | 'narrow';

type FoldedColumn = 'none' | 'todo' | 'doing' | 'review' | 'done';

type KanbanArgs = {
  width: BoardWidth;
  folded: FoldedColumn;
  emptyReview: boolean;
  slots: boolean;
  addForm: boolean;
};

interface KanbanDemoProps {
  width?: BoardWidth;
  folded?: FoldedColumn;
  emptyReview?: boolean;
  slots?: boolean;
  addForm?: boolean;
}

export type { FoldedColumn, KanbanArgs, KanbanDemoProps, Task, TaskColumn, TaskTag };
