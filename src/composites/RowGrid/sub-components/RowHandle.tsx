/* @layer renderer-components @kind component */
import type { KeyboardEvent } from 'react';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { Tooltip } from '../../../primitives/Tooltip';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { reorderStep } from '../../reorder/reorder-step';
import type { RowHandleProps } from '../RowGrid.type';
import './RowHandle.css';

const RowHandle = ({ name, index, total, drag, onStep }: RowHandleProps) => {
  const { rowGrid } = useTesseraStrings();
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>): void => {
    if (event.key === 'Escape') drag.cancel();
    const to = reorderStep(event, { axis: 'vertical', chord: 'plain', index, total });
    if (to === undefined) return;
    event.preventDefault();
    onStep(to);
  };
  return (
    <Tooltip content={rowGrid.moveHint} className="row-grid__grip">
      <IconButton
        variant="ghost"
        size="xs"
        label={rowGrid.move(name)}
        className="row-grid__handle"
        aria-keyshortcuts="ArrowUp ArrowDown"
        onKeyDown={onKeyDown}
        {...drag.handlers(index)}
      >
        <Icon name="grip-vertical" size={14} />
      </IconButton>
    </Tooltip>
  );
};

export { RowHandle };
