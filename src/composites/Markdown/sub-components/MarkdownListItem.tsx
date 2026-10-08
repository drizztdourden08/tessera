/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import type { MarkdownPartProps } from '../Markdown.type';

const MarkdownListItem = ({ children }: MarkdownPartProps) => <Box as="li" className="markdown__item">{children}</Box>;

export { MarkdownListItem };
