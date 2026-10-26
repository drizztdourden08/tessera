/* @layer renderer-components @kind component */
import { Code, Em, S, Strong } from '../../../primitives/text-elements';
import type { MarkdownPartProps } from '../Markdown.type';

const MarkdownInline = ({ node, children }: MarkdownPartProps) => {
  if (node?.tagName === 'strong') return <Strong>{children}</Strong>;
  if (node?.tagName === 'em') return <Em>{children}</Em>;
  if (node?.tagName === 'del') return <S>{children}</S>;
  return <Code>{children}</Code>;
};

export { MarkdownInline };
