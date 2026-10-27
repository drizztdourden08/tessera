/* @layer renderer-components @kind util */
import type { MarkdownSize } from '../Markdown.type';

const classesOf = (size: MarkdownSize, className: string | undefined): string =>
  ['markdown', size === 'inline' && 'markdown--inline', className].filter(Boolean).join(' ');

export { classesOf };
