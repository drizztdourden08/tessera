/* @layer stories @kind component */
import { useEffect, useState } from 'react';
import { LogPanel } from '../../../src/composites';
import type { LogRow } from '../../../src/composites';
import { Box, Button, Text } from '../../../src/primitives';
import { BUILD_LINES, buildRow, TERMINAL_KINDS } from './data-log-terminal';

const TICK_MS = 600;
const LOOPS = 12;

const LogTerminalDemo = () => {
  const [rows, setRows] = useState<readonly LogRow[]>([]);
  const ticking = rows.length < BUILD_LINES.length * LOOPS;
  useEffect(() => {
    if (!ticking) return undefined;
    const timer = setInterval(() => setRows((now) => [...now, buildRow(now.length)]), TICK_MS);
    return () => clearInterval(timer);
  }, [ticking]);
  const extra = <Button variant="tertiary" size="sm" onClick={() => setRows([])}>Start over</Button>;
  return (
    <Box className="story-column">
      <Text className="story-label">ansi turns colour codes into token colours. A line arrives every 0.6 s; scroll up and it stops following.</Text>
      <Box className="log-panel-story">
        <LogPanel
          ansi
          rows={rows}
          kinds={TERMINAL_KINDS}
          className="terminal-log"
          countLabel="lines"
          emptyLabel="Waiting for the build."
          toolbarExtra={extra}
        />
      </Box>
    </Box>
  );
};

export { LogTerminalDemo };
