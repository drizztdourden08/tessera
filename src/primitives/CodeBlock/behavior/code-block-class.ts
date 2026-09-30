/* @layer renderer-components @kind util */
import type { CodeBlockLooks } from '../CodeBlock.type';

const codeBlockClass = (looks: CodeBlockLooks): string => {
  const { showLineNumbers, copyable, wrap, capped, className } = looks;
  return [
    'code-block', showLineNumbers && 'code-block--numbered', copyable && 'code-block--copyable', wrap && 'code-block--wrap',
    capped && 'code-block--capped', className,
  ].filter(Boolean).join(' ');
};

export { codeBlockClass };
