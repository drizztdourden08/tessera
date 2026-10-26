/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import { Box } from '../../../primitives/Box';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { shownRows } from '../behavior/shown-rows';
import { useLogSelection } from '../behavior/useLogSelection';
import { useLogWindow } from '../behavior/useLogWindow';
import { LogJump } from './LogJump';
import { LogLine } from './LogLine';
import { LogOlder } from './LogOlder';
import type { LogListProps } from './LogList.type';

const LogList = (props: LogListProps) => {
  const { rows, kinds, selectedIds, onSelectionChange, ansi, follow = true, terminal = false, order = 'oldest-first' } = props;
  const { panels } = useTesseraStrings();
  const newestFirst = order === 'newest-first';
  const kindById = useMemo(() => new Map(kinds?.map((kind) => [kind.id, kind])), [kinds]);
  const win = useLogWindow(rows, follow, order);
  const shown = useMemo(() => shownRows(rows, win.shownCount, order), [rows, win.shownCount, order]);
  const ids = useMemo(() => shownRows(rows, rows.length, order).map((row) => row.id), [rows, order]);
  const mounted = useMemo(() => shown.map((row) => row.id), [shown]);
  const selection = useLogSelection({ order: ids, mounted, selectedIds, onSelectionChange, newestFirst });
  const lines = shown.map((row) => <LogLine key={row.id} row={row} kind={kindById.get(row.kind)} selection={selection} ansi={ansi} />);
  const older = win.hiddenOlder > 0 && <LogOlder hidden={win.hiddenOlder} newestFirst={newestFirst} onLoad={win.loadOlder} />;

  return (
    <Box className="log-panel__scroll">
      <Box ref={win.scrollRef} className="log-panel__list focus-ring-inset" role="log" tabIndex={selection ? undefined : 0} onScroll={win.handleScroll}>
        {!newestFirst && older}
        {selection
          ? (
            <Box ref={selection.listRef} role="listbox" aria-multiselectable="true" aria-label={panels.logLines} onKeyDown={selection.onKeyDown}>
              {lines}
            </Box>
          )
          : lines}
        {newestFirst && older}
      </Box>
      {!win.pinned && <LogJump newestFirst={newestFirst} terminal={terminal} onJump={win.jumpToNewest} />}
    </Box>
  );
};

export { LogList };
