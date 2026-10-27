/* @layer stories @kind story */
import { useState } from 'react';
import { Box, Card, Flex, Status, Text } from '../../../src/primitives';

const SESSIONS = [
  { id: 'sat', name: 'Saturday multiworld', players: 4, status: 'Running' },
  { id: 'relay', name: 'Relay practice', players: 2, status: 'Paused' },
  { id: 'solo', name: 'Solo seed 48213', players: 1, status: 'Finished' },
];

const SessionPickerDemo = () => {
  const [picked, setPicked] = useState<string | null>(null);
  const current = SESSIONS.find((session) => session.id === picked);

  return (
    <Box className="story-column">
      {SESSIONS.map((session) => (
        <Card key={session.id} variant="interactive" onClick={() => setPicked(session.id)}>
          <Flex justify="between" align="center" gap="md">
            <Box>
              <Text as="div">{session.name}</Text>
              <Text variant="caption">{`${session.players} players`}</Text>
            </Box>
            <Status tone={session.status === 'Running' ? 'success' : 'neutral'}>{session.status}</Status>
          </Flex>
        </Card>
      ))}
      <Text variant="caption">{current ? `Opened: ${current.name}` : 'Pick a session.'}</Text>
    </Box>
  );
};

export { SessionPickerDemo };
