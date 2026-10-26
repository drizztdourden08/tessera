/* @layer renderer-components @kind component */
import { Table } from '../../../primitives/Table';
import type { MarkdownPartProps } from '../Markdown.type';

const MarkdownTable = ({ children }: MarkdownPartProps) => <Table striped>{children}</Table>;

export { MarkdownTable };
