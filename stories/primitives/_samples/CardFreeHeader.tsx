/* @layer stories @kind story */
import { Box, Button, Card, Flex, Status, Tag, Text } from '../../../src/primitives';

const CardFreeHeader = () => (
  <Box className="story-column">
    <Card
      header={(
        <Flex justify="between" align="center" gap="md">
          <Flex gap="sm" align="center">
            <Status tone="success" dot dotSize="lg" halo>Online</Status>
            <Text>Saturday multiworld</Text>
            <Tag pill dot color="primary">4 players</Tag>
          </Flex>
          <Button size="sm" variant="secondary">Open</Button>
        </Flex>
      )}
    >
      <Text variant="subtitle">The header takes any content, laid out by the caller.</Text>
    </Card>
    <Card tone="info" header={<Text>With a tone, the row is tinted like a titled header.</Text>}>212 of 640 checks found.</Card>
  </Box>
);

export { CardFreeHeader };
