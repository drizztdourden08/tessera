/* @layer renderer-components @kind component */
import { TableRow } from '../../../primitives/Table';
import type { MarkdownPartProps } from '../Markdown.type';

const MarkdownTableRow = ({ children }: MarkdownPartProps) => <TableRow>{children}</TableRow>;

export { MarkdownTableRow };
