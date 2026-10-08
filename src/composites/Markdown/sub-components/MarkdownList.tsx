/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import type { MarkdownListProps } from '../Markdown.type';

const MarkdownList = ({ node, start, children }: MarkdownListProps) => {
  const numbered = node?.tagName === 'ol';
  const first = numbered && start !== undefined ? { start } : {};
  return (
    <Box as={numbered ? 'ol' : 'ul'} className={`markdown__list markdown__list--${numbered ? 'numbers' : 'bullets'}`} {...first}>
      {children}
    </Box>
  );
};

export { MarkdownList };
