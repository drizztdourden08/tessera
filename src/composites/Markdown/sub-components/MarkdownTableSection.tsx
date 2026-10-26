/* @layer renderer-components @kind component */
import { TableSection } from '../../../primitives/Table';
import type { MarkdownPartProps } from '../Markdown.type';

const MarkdownTableSection = ({ node, children }: MarkdownPartProps) => <TableSection head={node?.tagName === 'thead'}>{children}</TableSection>;

export { MarkdownTableSection };
