/* @layer renderer-components @kind component */
import type { KeyboardEvent } from 'react';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { Tooltip } from '../../../primitives/Tooltip';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { gripKeyDown } from '../../reorder/grip-key-down';
import type { RowHandleProps } from '../RowGrid.type';
import './RowHandle.css';

const RowHandle = ({ name, index, total, drag, onStep }: RowHandleProps) => {
  const { rowGrid } = useTesseraStrings();
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>): void => gripKeyDown(event, { drag, index, total, onStep });
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
