/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { ToolFrame } from '../../primitives/ToolFrame';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { defaultCopy } from './behavior/default-copy';
import { logPanelClass } from './behavior/log-panel-class';
import { useLogFilter } from './behavior/useLogFilter';
import { LogInput } from './sub-components/LogInput';
import { LogList } from './sub-components/LogList';
import { LogToolbar } from './sub-components/LogToolbar';
import type { LogPanelProps } from './LogPanel.type';
import '../../theme/focus-ring.css';
import './LogPanel.css';

const LogPanel = (props: LogPanelProps) => {
  const { panels } = useTesseraStrings();
  const {
    rows, kinds, className, toolbar = true, ansi, onInput, prompt,
    countLabel, emptyLabel = panels.logEmpty, toolbarExtra, height, selectedIds, onSelectionChange, follow, order,
  } = props;
  const copyText = defaultCopy(props);
  const filter = useLogFilter(props);
  const empty = rows.length === 0 ? emptyLabel : panels.logNoMatch;

  return (
    <ToolFrame
      className={logPanelClass(height, className)}
      style={typeof height === 'number' ? { blockSize: height } : undefined}
      toolbar={toolbar && (
        <LogToolbar filter={filter} total={rows.length} countLabel={countLabel ?? panels.logNoun(rows.length)} copyText={copyText} extra={toolbarExtra} />
      )}
    >
      {filter.shown.length === 0
        ? <Box className="log-panel__empty">{empty}</Box>
        : (
          <LogList
            rows={filter.shown}
            kinds={kinds}
            selectedIds={selectedIds}
            onSelectionChange={onSelectionChange}
            ansi={ansi}
            follow={follow}
            order={order}
            terminal={ansi === true || onInput !== undefined}
          />
        )}
      {onInput && <LogInput onInput={onInput} prompt={prompt} />}
    </ToolFrame>
  );
};

export { LogPanel };
