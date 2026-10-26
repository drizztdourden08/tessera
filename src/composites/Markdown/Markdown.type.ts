/* @layer renderer-components @kind types */
import type { CSSProperties, ReactNode } from 'react';
import type { ExtraProps } from 'react-markdown';
import type { CodeBlockLanguage } from '../CodeBlock/CodeBlock.type';

type MarkdownSize = 'sm' | 'md' | 'inline';

type MarkdownHeadingOffset = 0 | 1 | 2 | 3 | 4 | 5;

type MarkdownLinkHandler = (href: string) => void;

interface MarkdownProps {
  children?: string;
  source?: string;
  onLink?: MarkdownLinkHandler;
  headingOffset?: MarkdownHeadingOffset;
  hideTitle?: boolean;
  size?: MarkdownSize;
  className?: string;
}

interface MarkdownSettings {
  onLink?: MarkdownLinkHandler;
  headingOffset: MarkdownHeadingOffset;
  size: MarkdownSize;
}

interface MarkdownPartProps extends ExtraProps {
  children?: ReactNode;
}

interface MarkdownLinkProps extends MarkdownPartProps {
  href?: string;
}

interface MarkdownListProps extends MarkdownPartProps {
  start?: number;
}

interface MarkdownCellProps extends MarkdownPartProps {
  style?: CSSProperties;
}

interface MarkdownImageProps extends ExtraProps {
  alt?: string;
}

type MarkdownNode = NonNullable<ExtraProps['node']>;

type MarkdownChild = MarkdownNode['children'][number];

interface TaskParts {
  label: ReactNode[];
  nested: ReactNode[];
}

interface MarkdownCode {
  code: string;
  language: CodeBlockLanguage;
}

interface MarkdownTree {
  children?: { type: string; depth?: number }[];
}

export type {
  MarkdownCellProps, MarkdownChild, MarkdownCode, MarkdownHeadingOffset, MarkdownImageProps, MarkdownLinkHandler, MarkdownLinkProps, MarkdownListProps, MarkdownNode,
  MarkdownPartProps, MarkdownProps, MarkdownSettings, MarkdownSize, MarkdownTree, TaskParts,
};
