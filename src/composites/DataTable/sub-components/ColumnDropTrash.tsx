/* @layer renderer-components @kind component */
import { useState } from 'react';
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { Span } from '../../../primitives/text-elements';
import type { DragEvent } from 'react';
import type { ColumnDropTrashProps } from './ColumnDropTrash.type';

const ColumnDropTrash = (props: ColumnDropTrashProps) => {
  const { draggingPath, label, onRemove, onDragEnd } = props;
  const [over, setOver] = useState(false);

  if (draggingPath === null) return null;

  const handleDragOver = (event: DragEvent<HTMLElement>): void => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    setOver(true);
  };

  const handleDrop = (event: DragEvent<HTMLElement>): void => {
    event.preventDefault();
    setOver(false);
    onRemove(draggingPath);
    onDragEnd();
  };

  return (
    <Box
      className={over ? 'data-table__trash data-table__trash--over' : 'data-table__trash'}
      aria-label={`Drop ${label} here to remove the column`}
      onDragOver={handleDragOver}
      onDragLeave={() => setOver(false)}
      onDrop={handleDrop}
    >
      <Icon name="trash-2" size={24} />
      <Span className="data-table__trash-label">{over ? 'Release to remove' : 'Drop to remove'}</Span>
    </Box>
  );
};

export { ColumnDropTrash };
