/* @layer renderer-components @kind component */
import { TableCell } from '../../../primitives/Table';
import { alignOf } from '../behavior/align-of';
import type { MarkdownCellProps } from '../Markdown.type';

const MarkdownTableCell = ({ node, style, children }: MarkdownCellProps) => (
  <TableCell header={node?.tagName === 'th'} align={alignOf(style?.textAlign)}>{children}</TableCell>
);

export { MarkdownTableCell };
