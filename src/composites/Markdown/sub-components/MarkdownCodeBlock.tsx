/* @layer renderer-components @kind component */
import { CodeBlock } from '../../CodeBlock';
import { codeOf } from '../behavior/code-of';
import type { MarkdownPartProps } from '../Markdown.type';

const MarkdownCodeBlock = ({ node }: MarkdownPartProps) => {
  const { code, language } = codeOf(node);
  return <CodeBlock code={code} language={language} wrap copyable className="markdown__code" />;
};

export { MarkdownCodeBlock };
