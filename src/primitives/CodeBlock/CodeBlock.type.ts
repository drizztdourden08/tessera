/* @layer renderer-components @kind types */
type CodeBlockLanguage = 'typescript' | 'tsx' | 'json' | 'text';

interface CodeBlockProps {
  code: string;
  language: CodeBlockLanguage;
  className?: string;
  highlightedLines?: readonly number[];
  showLineNumbers?: boolean;
  copyable?: boolean;
  wrap?: boolean;
  capped?: boolean;
}

interface CodeBlockLooks {
  showLineNumbers: boolean;
  copyable: boolean;
  wrap: boolean;
  capped: boolean;
  className: string;
}

export type { CodeBlockLanguage, CodeBlockLooks, CodeBlockProps };
