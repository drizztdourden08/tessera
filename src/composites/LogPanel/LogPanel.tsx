/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { logAsText } from './behavior/log-as-text';
import { logPanelClass } from './behavior/log-panel-class';
import { useLogFilter } from './behavior/useLogFilter';
import { LogList } from './sub-components/LogList';
import { LogToolbar } from './sub-components/LogToolbar';
import type { LogPanelProps } from './LogPanel.type';
import '../../theme/focus-ring.css';
import './LogPanel.css';

const LogPanel = (props: LogPanelProps) => {
  const { panels } = useTesseraStrings();
  const {
    rows, kinds, className, toolbar = true, copyText = logAsText,
    countLabel, emptyLabel = panels.logEmpty, toolbarExtra, height,
  } = props;
  const filter = useLogFilter(props);
  const empty = rows.length === 0 ? emptyLabel : panels.logNoMatch;

  return (
    <Box className={logPanelClass(height, className)} style={typeof height === 'number' ? { blockSize: height } : undefined}>
      {toolbar && (
        <LogToolbar filter={filter} total={rows.length} countLabel={countLabel ?? panels.logNoun(rows.length)} copyText={copyText} extra={toolbarExtra} />
      )}
      {filter.shown.length === 0
        ? <Box className="log-panel__empty">{empty}</Box>
        : <LogList rows={filter.shown} kinds={kinds} />}
    </Box>
  );
};

export { LogPanel };
