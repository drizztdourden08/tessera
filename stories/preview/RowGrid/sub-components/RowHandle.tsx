/* @layer stories @kind component */
import type { KeyboardEvent } from 'react';
import { Icon, IconButton, Tooltip } from '../../../../src/primitives';
import { ROW_GRID_STRINGS } from '../row-grid-strings.constants';
import type { RowHandleProps } from '../RowGrid.type';

const RowHandle = ({ name, index, total, drag, onStep }: RowHandleProps) => {
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>): void => {
    if (event.key === 'Escape') drag.cancel();
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const to = { ArrowUp: index - 1, ArrowDown: index + 1 }[event.key];
    if (to === undefined || to < 0 || to >= total) return;
    event.preventDefault();
    onStep(to);
  };
  return (
    <Tooltip content={ROW_GRID_STRINGS.moveHint} className="row-grid__grip">
      <IconButton
        variant="ghost"
        size="xs"
        label={ROW_GRID_STRINGS.move(name)}
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
