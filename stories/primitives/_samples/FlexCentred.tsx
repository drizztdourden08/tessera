/* @layer stories @kind component */
import { Box, Flex, Text } from '../../../src/primitives';

const PLAYERS = [
  { initials: 'AR', name: 'Aria', game: 'Lost Woods run' },
  { initials: 'BR', name: 'Brom', game: 'Desert run' },
  { initials: 'CA', name: 'Cadence', game: 'Mountain run' },
];

const FlexCentred = () => (
  <Box className="story-column">
    <Flex className="flex-demo flex-demo--centre" direction="column" gap="sm" align="center" justify="center">
      <Text variant="title">Lobby</Text>
      <Text variant="subtitle">Waiting for the host to start the session</Text>
    </Flex>
    {PLAYERS.map((player) => (
      <Flex key={player.name} gap="sm" align="center">
        <Flex inline align="center" justify="center" className="flex-demo__avatar">{player.initials}</Flex>
        <Box>
          <Text as="div">{player.name}</Text>
          <Text variant="caption">{player.game}</Text>
        </Box>
      </Flex>
    ))}
  </Box>
);

export { FlexCentred };
