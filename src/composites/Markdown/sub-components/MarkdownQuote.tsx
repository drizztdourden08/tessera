/* @layer renderer-components @kind component */
import { BlockQuote } from '../../../primitives/text-elements';
import type { MarkdownPartProps } from '../Markdown.type';

const MarkdownQuote = ({ children }: MarkdownPartProps) => <BlockQuote className="markdown__quote">{children}</BlockQuote>;

export { MarkdownQuote };
