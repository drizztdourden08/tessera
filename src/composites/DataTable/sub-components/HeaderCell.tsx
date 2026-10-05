/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../../../primitives/Box';
import { useMenuOpen } from '../../field-kits/behavior/useMenuOpen';
import { headerCellClasses } from '../behavior/header-cell-classes';
import { useColumnRename } from '../behavior/useColumnRename';
import { useColumnResize } from '../behavior/useColumnResize';
import { useHeaderDrag } from '../behavior/useHeaderDrag';
import { ColumnDragGhost } from './ColumnDragGhost';
import { ColumnResizeHandle } from './ColumnResizeHandle';
import { HeaderLabel } from './HeaderLabel';
import { HeaderMenu } from './HeaderMenu';
import { SortToggle } from './SortToggle';
import type { DragEvent } from 'react';
import type { HeaderCellProps } from './HeaderCell.type';
import './HeaderCell.css';

const HeaderCell = (props: HeaderCellProps) => {
  const { column, field, index, sortDir, actions, drag, ghostRows, rowTotal } = props;
  const { path } = column;

  const menu = useMenuOpen<HTMLButtonElement>();
  const ghostRef = useRef<HTMLElement>(null);
  const cellRef = useRef<HTMLElement>(null);
  const rename = useColumnRename({ path, onRename: actions.onRename });

  const label = column.label ?? field?.label ?? path;
  const resize = useColumnResize({
    path, cellRef, onPreview: actions.onPreviewResize, onResize: actions.onResize,
  });
  const dragState = useHeaderDrag({ path, index, drag, cellRef });
  const classes = headerCellClasses({ ...dragState, menuOpen: menu.open, sorted: sortDir !== undefined });

  const handleDragStart = (event: DragEvent<HTMLElement>): void =>
    drag.onDragStart({ path, index, event, ghost: ghostRef.current });

  return (
    <Box
      ref={cellRef}
      className={classes}
      role="columnheader"
      draggable={!rename.renaming && !resize.resizing}
      title={path}
      data-column-head={path}
      onDragStart={handleDragStart}
      onDragOver={(event: DragEvent<HTMLElement>) => drag.onDragOver(index, event)}
      onDrop={(event: DragEvent<HTMLElement>) => drag.onDrop(index, event)}
      onDragEnd={drag.onDragEnd}
    >
      <ColumnDragGhost ref={ghostRef} label={label} path={path} field={field} rows={ghostRows} total={rowTotal} />
      <HeaderLabel
        label={label}
        name={column.label ?? ''}
        renaming={rename.renaming}
        onKeep={rename.keepRename}
        onUndo={rename.undoRename}
      />
      <Box className="data-table__header-chrome">
        <SortToggle label={label} sortDir={sortDir} onToggle={() => actions.onToggleSort(path)} />
        <HeaderMenu {...props} menu={menu} label={label} onStartRename={rename.startRename} />
      </Box>
      <ColumnResizeHandle
        label={label}
        index={index}
        resize={resize}
        onDragOver={drag.onDragOver}
        onDrop={drag.onDrop}
      />
    </Box>
  );
};

export { HeaderCell };
