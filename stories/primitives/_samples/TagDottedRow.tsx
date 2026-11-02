/* @layer stories @kind component */
import { Flex, Tag } from '../../../src/primitives';

const none = () => undefined;

const TagDottedRow = () => (
  <Flex gap="md" align="center" wrap>
    <Tag dot>Idle</Tag>
    <Tag dot color="primary">Featured</Tag>
    <Tag dot pill variant="urgency" color="success">Online</Tag>
    <Tag dot pill variant="urgency" color="danger">Offline</Tag>
    <Tag dot variant="urgency" color="warning" onRemove={none}>Syncing</Tag>
    <Tag dot variant="custom" color="#2e8b57">Link</Tag>
  </Flex>
);

export { TagDottedRow };
