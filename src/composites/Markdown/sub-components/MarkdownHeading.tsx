/* @layer renderer-components @kind component */
import { Text } from '../../../primitives/Text';
import { useMarkdownSettings } from '../behavior/useMarkdownSettings';
import { HEADING_TAGS } from '../Markdown.constants';
import type { MarkdownPartProps } from '../Markdown.type';

const MarkdownHeading = ({ node, children }: MarkdownPartProps) => {
  const { headingOffset } = useMarkdownSettings();
  const depth = Number(node?.tagName.slice(1)) || 1;
  const tag = HEADING_TAGS[Math.min(HEADING_TAGS.length, depth + headingOffset) - 1] ?? 'h6';
  return <Text as={tag} className={`markdown__heading markdown__heading--${depth}`}>{children}</Text>;
};

export { MarkdownHeading };
