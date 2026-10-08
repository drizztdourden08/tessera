/* @layer renderer-components @kind component */
import { Paragraph } from '../../../primitives/text-elements';
import type { MarkdownPartProps } from '../Markdown.type';

const MarkdownParagraph = ({ children }: MarkdownPartProps) => <Paragraph className="markdown__paragraph">{children}</Paragraph>;

export { MarkdownParagraph };
