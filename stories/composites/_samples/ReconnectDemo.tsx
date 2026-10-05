/* @layer stories @kind component */
import type { ReactNode } from 'react';
import { Box, Button } from '../../../src/primitives';
import { RetryButton } from '../../../src/composites';
import { MAX_TRIES, RECONNECT_DETAIL } from './connection-samples.constants';
import { ConnectionCard } from './ConnectionCard';
import type { ConnectionPhase } from './ConnectionCard.type';
import { useReconnectLoop } from './useReconnectLoop';

const ReconnectDemo = () => {
  const { phase, attempt, retryAt, trying, retryNow, restart } = useReconnectLoop();
  const counted = phase === 'reconnecting';
  const retry = (
    <RetryButton
      onRetry={retryNow}
      retryAt={retryAt}
      attempt={counted ? attempt : undefined}
      attempts={counted ? MAX_TRIES : undefined}
      retrying={trying}
    />
  );
  const drop = <Button variant="tertiary" size="sm" onClick={restart}>Drop the link</Button>;
  const actions: Partial<Record<ConnectionPhase, ReactNode>> = { reconnecting: retry, failed: retry, live: drop };
  return (
    <Box className="connection-story">
      <ConnectionCard phase={phase} detail={RECONNECT_DETAIL[phase]} action={actions[phase]} />
    </Box>
  );
};

export { ReconnectDemo };
