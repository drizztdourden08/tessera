/* @layer stories @kind component */
import { Box, Card, Flex, Stack, Tag, Text } from '../../../src/primitives';
import type { TagLook } from '../../../src/primitives';

type Game = { name: string; tags: readonly { label: string; look: TagLook }[] };

const GAMES: readonly Game[] = [
  { name: 'A Link to the Past', tags: [{ label: 'Zelda', look: { variant: 'category', color: 'green' } }, { label: 'Stable', look: { variant: 'urgency', color: 'success' } }] },
  { name: 'Super Metroid', tags: [{ label: 'Metroid', look: { variant: 'category', color: 'violet' } }, { label: 'Beta', look: { variant: 'urgency', color: 'warning' } }] },
  { name: 'Pokemon Red', tags: [{ label: 'Pokemon', look: { variant: 'category', color: 'rose' } }, { label: 'Featured', look: { color: 'primary' } }] },
];

const TagOnItems = () => (
  <Box className="story-column">
    <Card>
      <Stack gap="sm">
        {GAMES.map((game) => (
          <Flex key={game.name} justify="between" align="center" gap="md">
            <Text>{game.name}</Text>
            <Flex gap="xs">{game.tags.map((tag) => <Tag key={tag.label} {...tag.look}>{tag.label}</Tag>)}</Flex>
          </Flex>
        ))}
      </Stack>
    </Card>
  </Box>
);

export { TagOnItems };
