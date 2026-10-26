/* @layer renderer-components @kind component */
import { List } from '../../../primitives/List';
import type { MarkdownListProps } from '../Markdown.type';

const MarkdownList = ({ node, start, children }: MarkdownListProps) => <List ordered={node?.tagName === 'ol'} start={start}>{children}</List>;

export { MarkdownList };
