/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../../../primitives/Box';
import { Checkbox } from '../../../primitives/Checkbox';
import type { MouseEvent, PointerEvent } from 'react';
import type { SelectCellProps } from './SelectCell.type';
import './SelectCell.css';

const stop = (event: MouseEvent<HTMLElement>) => event.stopPropagation();

const SelectCell = (props: SelectCellProps) => {
  const { role, checked, indeterminate = false, ariaLabel, onToggle } = props;
  const shiftRef = useRef(false);

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    shiftRef.current = event.shiftKey;
  };

  const handleChange = () => {
    const range = shiftRef.current;
    shiftRef.current = false;
    onToggle(range);
  };

  return (
    <Box role={role} className="data-table__select" onPointerDown={handlePointerDown} onClick={stop}>
      <Checkbox size="sm" checked={checked} indeterminate={indeterminate} ariaLabel={ariaLabel} onChange={handleChange} />
    </Box>
  );
};

export { SelectCell };
