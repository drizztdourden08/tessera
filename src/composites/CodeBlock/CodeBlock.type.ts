/* @layer renderer-components @kind types */
import type { CodeBlockLanguage, CodeViewProps } from '../../primitives/code-view/code-view.type';

interface CodeBlockProps extends Omit<CodeViewProps, 'copy'> {
  copyable?: boolean;
}

export type { CodeBlockLanguage, CodeBlockProps };
