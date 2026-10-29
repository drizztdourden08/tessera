/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import '../../theme/visually-hidden.css';
import { useKanbanBoard } from './behavior/useKanbanBoard';
import type { KanbanBoardProps, KanbanCardData } from './KanbanBoard.type';
import { KanbanLane } from './sub-components/KanbanLane';
import './KanbanBoard.css';

const KanbanBoard = <Item extends KanbanCardData>(props: KanbanBoardProps<Item>) => {
  const { columns, label, columnWidth = 'fixed', columnHeight = 'stretch', grip = true, stack = false, className } = props;
  const { kanbanBoard } = useTesseraStrings();
  const { boardRef, shared, collapsed, message } = useKanbanBoard(props);
  const classes = ['kanban', columnWidth === 'fill' && 'kanban--fill', columnHeight === 'fit' && 'kanban--fit', !grip && 'kanban--no-grip', className];
  const board = (
    <Box ref={boardRef} role="group" aria-label={label ?? kanbanBoard.board} className={classes.filter(Boolean).join(' ')}>
      {columns.map((column, index) => (
        <KanbanLane key={column.id} column={column} index={index} collapsed={collapsed.includes(column.id)} shared={shared} />
      ))}
      <Box className="visually-hidden" aria-live="polite">{message}</Box>
    </Box>
  );
  return stack ? <Box className="kanban-stack">{board}</Box> : board;
};

export { KanbanBoard };
