/* @layer renderer-components @kind types */
import type { CodeBlockLanguage, CodeViewProps } from '../../primitives/code-view/code-view.type';

interface CodeBlockShowProps extends Omit<CodeViewProps, 'copy'> {
  copyable?: boolean;
  editable?: false;
}

interface CodeBlockEditProps {
  editable: true;
  value: string;
  onChange: (value: string) => void;
  language: CodeBlockLanguage;
  invalid?: boolean;
  problemLine?: number;
  readOnly?: boolean;
  disabled?: boolean;
  id?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
  className?: string;
}

type CodeBlockProps = CodeBlockShowProps | CodeBlockEditProps;

export type { CodeBlockEditProps, CodeBlockLanguage, CodeBlockProps };
