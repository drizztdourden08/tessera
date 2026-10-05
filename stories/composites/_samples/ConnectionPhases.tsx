/* @layer stories @kind component */
import { useState } from 'react';
import { Stack } from '../../../src/primitives';
import { RetryButton } from '../../../src/composites';
import { CONNECTION_ROWS } from './connection-samples.constants';
import { ConnectionCard } from './ConnectionCard';
import type { ConnectionRetry } from './ConnectionCard.type';
import { RoomPasswordForm } from './RoomPasswordForm';

const RetryFor = ({ retry }: { retry: ConnectionRetry }) => {
  const [retryAt] = useState(() => (retry.waitMs === undefined ? null : Date.now() + retry.waitMs));
  return <RetryButton onRetry={() => undefined} retryAt={retryAt} attempt={retry.attempt} attempts={retry.attempts} />;
};

const ConnectionPhases = () => (
  <Stack gap="sm" className="connection-story">
    {CONNECTION_ROWS.map((row) => (
      <ConnectionCard
        key={row.phase}
        phase={row.phase}
        detail={row.detail}
        action={row.retry && <RetryFor retry={row.retry} />}
      >
        {row.auth && <RoomPasswordForm />}
      </ConnectionCard>
    ))}
  </Stack>
);

export { ConnectionPhases };
