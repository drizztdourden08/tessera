/* @layer renderer-components @kind util */
import type { CodeViewLooks } from './code-view.type';

const codeViewClass = (looks: CodeViewLooks): string => {
  const { showLineNumbers, copyable, wrap, capped, className } = looks;
  return [
    'code-block', showLineNumbers && 'code-block--numbered', copyable && 'code-block--copyable', wrap && 'code-block--wrap',
    capped && 'code-block--capped', className,
  ].filter(Boolean).join(' ');
};

export { codeViewClass };
