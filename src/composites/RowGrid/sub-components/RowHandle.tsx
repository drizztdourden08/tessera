/* @layer renderer-components @kind component */
import type { KeyboardEvent } from 'react';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { Tooltip } from '../../../primitives/Tooltip';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { RowHandleProps } from '../RowGrid.type';
import './RowHandle.css';

const RowHandle = ({ name, index, total, drag, onStep }: RowHandleProps) => {
  const { rowGrid } = useTesseraStrings();
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>): void => {
    if (event.key === 'Escape') drag.cancel();
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const to = { ArrowUp: index - 1, ArrowDown: index + 1 }[event.key];
    if (to === undefined || to < 0 || to >= total) return;
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
