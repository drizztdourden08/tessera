/* @layer stories @kind component */
import type { ReactNode } from 'react';
import { Box, Button, Flex, Icon, ScrollArea, Shortcut, Stack, Text, TextInput } from '../../../src/primitives';

type QuickCommand = { label: string; command: string; confirm?: boolean };
type ConsoleLine = { id: string; kind: 'sent' | 'reply' | 'error'; text: string };
type CommandConsoleProps = {
  onSubmit: (command: string) => void;
  draft?: string;
  placeholder?: string;
  disabled?: boolean;
  disabledReason?: ReactNode;
  quick?: readonly QuickCommand[];
  lines?: readonly ConsoleLine[];
};

const CommandConsole = ({ draft = '', placeholder, disabled, disabledReason, quick = [], lines = [] }: CommandConsoleProps) => (
  <Stack gap="sm" className="spike-console" data-empty={lines.length ? undefined : ""}>
    <ScrollArea className="spike-console__out" scrollbar="slim">
      <Box className="spike-console__lines">
        {!lines.length && <Text variant="caption">Replies from the server show here.</Text>}
        {lines.map((l) => <Text key={l.id} variant="caption" mono className="spike-console__line" data-kind={l.kind}>{l.kind === 'sent' ? `> ${l.text}` : l.text}</Text>)}
      </Box>
    </ScrollArea>
    <Flex gap="xs" align="center">
      <TextInput className="spike-console__input" aria-label="Server command" value={draft} placeholder={placeholder} disabled={disabled} readOnly
        start={{ icon: 'chevron-right' }} />
      <Button variant="primary" disabled={disabled || !draft.trim()} icon={<Icon name="send" />}>Send</Button>
    </Flex>
    <Flex gap="xs" align="center" justify="between" wrap>
      <Flex gap="xs" wrap>
        {quick.map((q) => <Button key={q.command} size="sm" variant="secondary" disabled={disabled}>{q.confirm ? `${q.label}…` : q.label}</Button>)}
      </Flex>
      <Flex gap="xs" align="center" className="spike-console__keys">
        <Shortcut keys={['up']} /><Shortcut keys={['down']} /><Text variant="caption">history</Text>
        <Shortcut keys={['esc']} /><Text variant="caption">clear</Text>
      </Flex>
    </Flex>
    {disabled && disabledReason && <Text variant="caption">{disabledReason}</Text>}
  </Stack>
);

export { CommandConsole };
export type { CommandConsoleProps, ConsoleLine, QuickCommand };
