/* @layer stories @kind component */
import type { ReactNode } from 'react';
import { Box, Button, Flex, Icon, Stack, Status, Text } from '../../../src/primitives';
import type { StatusTone } from '../../../src/primitives';

type Phase = 'idle' | 'connecting' | 'live' | 'reconnecting' | 'closed' | 'failed' | 'auth';
type ConnectionStatusProps = {
  phase: Phase;
  label?: ReactNode;
  detail?: ReactNode;
  since?: string;
  onRetry?: () => void;
  auth?: ReactNode;
  compact?: boolean;
};

const LOOK: Record<Phase, { tone: StatusTone; label: string; pulse?: boolean }> = {
  idle: { tone: 'neutral', label: 'Not connected' },
  connecting: { tone: 'info', label: 'Connecting to the room', pulse: true },
  live: { tone: 'success', label: 'Live' },
  reconnecting: { tone: 'warning', label: 'Reconnecting', pulse: true },
  closed: { tone: 'neutral', label: 'The room closed the connection' },
  failed: { tone: 'danger', label: 'Live view failed' },
  auth: { tone: 'warning', label: 'This room has a password' },
};

const ConnectionStatus = ({ phase, label, detail, since, onRetry, auth, compact }: ConnectionStatusProps) => {
  const look = LOOK[phase];
  const retry = (phase === 'failed' || phase === 'closed') && onRetry;
  if (compact) return <Status tone={look.tone} dot pulse={look.pulse}>{label ?? look.label}</Status>;
  return (
    <Stack gap="xs" className="spike-connection" data-phase={phase}>
      <Flex gap="sm" align="center" justify="between">
        <Flex gap="sm" align="center">
          <Status tone={look.tone} dot pulse={look.pulse}>{label ?? look.label}</Status>
          {since && <Text variant="caption">{since}</Text>}
        </Flex>
        {retry && <Button size="sm" variant="secondary" icon={<Icon name="refresh-cw" />} onClick={onRetry}>Retry</Button>}
      </Flex>
      {detail && <Text variant="caption">{detail}</Text>}
      {phase === 'auth' && auth && <Box>{auth}</Box>}
    </Stack>
  );
};

export { ConnectionStatus };
export type { ConnectionStatusProps, Phase };
