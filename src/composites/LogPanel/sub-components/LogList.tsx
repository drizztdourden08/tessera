/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import { Box } from '../../../primitives/Box';
import { Button } from '../../../primitives/Button';
import { Glyph } from '../../../primitives/Glyph';
import { Text } from '../../../primitives/Text';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { useLogWindow } from '../behavior/useLogWindow';
import { OLDER_CHUNK } from '../LogPanel.constants';
import { LogLine } from './LogLine';
import type { LogListProps } from './LogList.type';

const LogList = (props: LogListProps) => {
  const { rows, kinds } = props;
  const { panels } = useTesseraStrings();
  const kindById = useMemo(() => new Map(kinds?.map((kind) => [kind.id, kind])), [kinds]);
  const win = useLogWindow(rows.length);
  const first = rows.length - win.shownCount;

  return (
    <Box className="log-panel__scroll">
      <Box ref={win.scrollRef} className="log-panel__list focus-ring-inset" role="log" tabIndex={0} onScroll={win.handleScroll}>
        {win.hiddenOlder > 0 && (
          <Box className="log-panel__older">
            <Button variant="ghost" size="sm" icon={<Glyph name="arrowUp" />} onClick={win.loadOlder}>
              {panels.loadOlder(Math.min(OLDER_CHUNK, win.hiddenOlder))}
            </Button>
            <Text className="log-panel__older-note">{panels.olderHidden(win.hiddenOlder)}</Text>
          </Box>
        )}
        {rows.slice(first).map((row) => <LogLine key={row.id} row={row} kind={kindById.get(row.kind)} />)}
      </Box>
      {!win.pinned && (
        <Button variant="secondary" size="sm" className="log-panel__to-bottom" icon={<Glyph name="arrowDown" />} onClick={win.jumpToBottom}>
          {panels.newest}
        </Button>
      )}
    </Box>
  );
};

export { LogList };
