/* @layer renderer-components @kind util */
import type { KanbanColumn } from '../KanbanBoard.type';

const sizesOf = (columns: readonly KanbanColumn[]): number[] => columns.map((column) => column.cards.length);

export { sizesOf };
