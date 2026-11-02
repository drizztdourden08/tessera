/* @layer stories @kind component */
import { Flex, Tag } from '../../../src/primitives';

const TagFillRow = () => (
  <Flex gap="md" align="center" wrap>
    <Tag fill="solid">Solid</Tag>
    <Tag fill="solid" pill icon="book">Docs</Tag>
    <Tag fill="tint">Neutral tint</Tag>
    <Tag fill="tint" edge="dashed" pill icon="git-branch">Kept</Tag>
    <Tag fill="tint" edge="dashed" color="primary">Dashed</Tag>
    <Tag fill="tint" color="primary">Tinted</Tag>
    <Tag fill="tint" pill variant="urgency" color="danger">Failed</Tag>
    <Tag fill="tint" variant="category" color="teal">Lab</Tag>
    <Tag fill="tint" variant="custom" color="#2e8b57">Custom</Tag>
  </Flex>
);

export { TagFillRow };
