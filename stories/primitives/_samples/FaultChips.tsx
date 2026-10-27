/* @layer stories @kind component */
import { Box, Flex, Status, Tag, Text } from '../../../src/primitives';

const FaultTags = () => (
  <Box className="story-column">
    <Flex gap="md" align="center" wrap>
      <Tag variant="urgency" color="danger">brock-lint</Tag>
      <Tag variant="urgency" color="danger" reason="timed out">brock-lint</Tag>
      <Tag variant="urgency" color="warning" reason="slow">tessera-build</Tag>
      <Tag outlined pill variant="urgency" color="danger" reason="exit 2">argus-sync</Tag>
    </Flex>
    <Text className="story-label">The first tag has no reason. With reason, the name stays in the text colour and only the reason takes the tone.</Text>
  </Box>
);

const FaultStatuses = () => (
  <Box className="story-column">
    <Flex gap="md" align="center" wrap>
      <Status tone="danger" dot>Failed</Status>
      <Status tone="danger" dot reason="timed out">Failed</Status>
      <Status tone="warning" dot reason="retrying">Slow</Status>
      <Status tone="danger" variant="pill" reason="exit 2">Failed</Status>
    </Flex>
    <Text className="story-label">The first status has no reason. With reason, the word stays in the text colour and only the reason takes the tone.</Text>
  </Box>
);

export { FaultStatuses, FaultTags };
