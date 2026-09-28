/* @layer renderer-components @kind component */
import { useState } from 'react';
import { Box } from '../../../primitives/Box';
import { PathIcon } from '../../../primitives/PathIcon';
import { Text } from '../../../primitives/Text';
import { TRASH_ICON_PATHS } from '../DataTable.constants';
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
      <PathIcon
        paths={TRASH_ICON_PATHS}
        size={24}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Text className="data-table__trash-label">{over ? 'Release to remove' : 'Drop to remove'}</Text>
    </Box>
  );
};

export { ColumnDropTrash };
