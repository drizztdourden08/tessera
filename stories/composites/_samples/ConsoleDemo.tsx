/* @layer stories @kind component */
import { useState } from 'react';
import { LogPanel } from '../../../src/composites';
import type { LogRow } from '../../../src/composites';
import { Box, Button } from '../../../src/primitives';
import { CommandInput } from '../../../src/composites';
import { CONSOLE_HISTORY, CONSOLE_KINDS, CONSOLE_REPLIES, QUICK_COMMANDS } from './console-samples.constants';

const replyTo = (command: string, at: number): LogRow[] => {
  const known = CONSOLE_REPLIES[command.split(' ')[0] ?? ''];
  return [
    { id: `${at}-sent`, gutter: '>', tag: '', kind: 'sent', message: command },
    { id: `${at}-reply`, gutter: '', tag: '', kind: known ? 'reply' : 'error', message: known ?? `Unknown command ${command}` },
  ];
};

const ConsoleDemo = ({ disabled = false }: { disabled?: boolean }) => {
  const [rows, setRows] = useState<readonly LogRow[]>([]);
  const [history, setHistory] = useState<readonly string[]>(CONSOLE_HISTORY);
  const send = (command: string) => {
    setRows((now) => [...now, ...replyTo(command, now.length)]);
    setHistory((now) => [...now, command]);
  };
  const quick = QUICK_COMMANDS.map(({ label, command }) => (
    <Button key={command} variant="secondary" size="sm" disabled={disabled} onClick={() => send(command)}>{label}</Button>
  ));
  return (
    <Box className="console-story">
      <LogPanel rows={rows} kinds={CONSOLE_KINDS} height={160} toolbar={false} emptyLabel="Replies from the server show here." />
      <CommandInput placeholder="/hint Bram Moon Pearl" history={history} disabled={disabled} onSubmit={send} actions={quick} />
    </Box>
  );
};

export { ConsoleDemo };
