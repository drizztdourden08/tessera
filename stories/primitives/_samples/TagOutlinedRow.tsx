/* @layer stories @kind component */
import { Flex, Tag } from '../../../src/primitives';

const TagOutlinedRow = () => (
  <Flex gap="md" align="center" wrap>
    <Tag outlined pill icon="book">Docs</Tag>
    <Tag outlined pill icon="flask" color="primary">Experiment</Tag>
    <Tag outlined pill icon="robot" variant="urgency" color="info">Automated</Tag>
    <Tag outlined pill icon="flask" variant="category" color="teal">Lab</Tag>
    <Tag outlined variant="custom" color="#2e8b57">Custom</Tag>
  </Flex>
);

export { TagOutlinedRow };
