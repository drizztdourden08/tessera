/* @layer renderer-components @kind types */
type CodeBlockLanguage = 'typescript' | 'tsx' | 'json';

interface CodeBlockProps {
  code: string;
  language: CodeBlockLanguage;
  className?: string;
  highlightedLines?: readonly number[];
  showLineNumbers?: boolean;
  copyable?: boolean;
}

export type { CodeBlockLanguage, CodeBlockProps };
