/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { gripKeyDown } from '../../reorder/grip-key-down';
import type { KeyboardEvent, MouseEvent, PointerEvent } from 'react';
import type { RowGripProps } from './RowGrip.type';
import './RowGrip.css';

const stop = (event: MouseEvent<HTMLElement>) => event.stopPropagation();

const RowGrip = ({ id, reorder }: RowGripProps) => {
  const { table } = useTesseraStrings();
  const { drag, total, step } = reorder;
  const index = reorder.indexOf(id);
  const handlers = reorder.handlers(index);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => gripKeyDown(event, { drag, index, total, onStep: (to) => step(index, to) });

  const onPointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    handlers.onPointerDown(event);
  };

  if (index < 0) return null;
  return (
    <Box role="gridcell" className="data-table__grip" onClick={stop}>
      <IconButton
        variant="ghost"
        size="xs"
        label={table.moveRow}
        className="data-table__grip-handle"
        aria-keyshortcuts="ArrowUp ArrowDown"
        onKeyDown={onKeyDown}
        {...handlers}
        onPointerDown={onPointerDown}
      >
        <Icon name="grip-vertical" size={14} />
      </IconButton>
    </Box>
  );
};

export { RowGrip };
