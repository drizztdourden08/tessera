/* @layer stories @kind component */
import { useState } from 'react';
import { LogPanel } from '../../../src/composites';
import type { LogRow } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { shellReply, TERMINAL_KINDS } from './data-log-terminal';

const line = (id: number, message: string): LogRow => ({ id: `shell-${id}`, gutter: '', tag: '', kind: 'out', message });

const WELCOME = [line(0, 'Type help, then press Enter. Up and Down walk what you sent.')];

const LogShellDemo = () => {
  const [rows, setRows] = useState<readonly LogRow[]>(WELCOME);
  const send = (text: string) => {
    if (text === 'clear') {
      setRows([]);
      return;
    }
    setRows((now) => {
      const replies = shellReply(text);
      return [...now, line(now.length, `> ${text}`), ...replies.map((reply, i) => line(now.length + 1 + i, reply))];
    });
  };
  return (
    <Box className="story-column">
      <Text className="story-label">Type help and press Enter. Up and Down bring back what you sent.</Text>
      <Box className="log-panel-story">
        <LogPanel ansi rows={rows} kinds={TERMINAL_KINDS} className="terminal-log" toolbar={false} onInput={send} />
      </Box>
    </Box>
  );
};

export { LogShellDemo };
