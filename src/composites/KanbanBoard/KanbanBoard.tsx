/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import '../../theme/visually-hidden.css';
import { useKanbanBoard } from './behavior/useKanbanBoard';
import type { KanbanBoardProps, KanbanCardData } from './KanbanBoard.type';
import { KanbanLane } from './sub-components/KanbanLane';
import './KanbanBoard.css';

const KanbanBoard = <Item extends KanbanCardData>(props: KanbanBoardProps<Item>) => {
  const { columns, label, className } = props;
  const { kanbanBoard } = useTesseraStrings();
  const { boardRef, shared, collapsed, message } = useKanbanBoard(props);
  return (
    <Box ref={boardRef} role="group" aria-label={label ?? kanbanBoard.board} className={['kanban', className].filter(Boolean).join(' ')}>
      {columns.map((column, index) => (
        <KanbanLane key={column.id} column={column} index={index} collapsed={collapsed.includes(column.id)} shared={shared} />
      ))}
      <Box className="visually-hidden" aria-live="polite">{message}</Box>
    </Box>
  );
};

export { KanbanBoard };
