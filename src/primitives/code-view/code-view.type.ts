/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type CodeBlockLanguage = 'typescript' | 'tsx' | 'json' | 'text';

interface CodeViewProps {
  code: string;
  language: CodeBlockLanguage;
  className?: string;
  highlightedLines?: readonly number[];
  showLineNumbers?: boolean;
  wrap?: boolean;
  capped?: boolean;
  copy?: ReactNode;
}

interface CodeViewLooks {
  showLineNumbers: boolean;
  copyable: boolean;
  wrap: boolean;
  capped: boolean;
  className: string;
}

export type { CodeBlockLanguage, CodeViewLooks, CodeViewProps };
