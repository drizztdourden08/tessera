/* @layer stories @kind types */
import type { KanbanCardData, KanbanColumn, KanbanColumnHeight, KanbanColumnWidth } from '../../../src/composites';

type TaskTag = 'bug' | 'design' | 'docs' | 'api';

interface Task extends KanbanCardData {
  title: string;
  tags: readonly TaskTag[];
}

type TaskColumn = KanbanColumn<Task>;

type BoardWidth = 'full' | 'narrow' | 'phone';

type FoldedColumn = 'none' | 'todo' | 'doing' | 'review' | 'done';

type KanbanArgs = {
  width: BoardWidth;
  columnWidth: KanbanColumnWidth;
  folded: FoldedColumn;
  emptyReview: boolean;
  slots: boolean;
  addForm: boolean;
  edges: boolean;
  columnHeight: KanbanColumnHeight;
  grip: boolean;
  foldable: boolean;
  stack: boolean;
};

interface KanbanDemoProps {
  width?: BoardWidth;
  columnWidth?: KanbanColumnWidth;
  folded?: FoldedColumn;
  emptyReview?: boolean;
  slots?: boolean;
  addForm?: boolean;
  edges?: boolean;
  columnHeight?: KanbanColumnHeight;
  grip?: boolean;
  foldable?: boolean;
  stack?: boolean;
}

export type { FoldedColumn, KanbanArgs, KanbanDemoProps, Task, TaskColumn, TaskTag };
