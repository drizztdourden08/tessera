/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { ExtraProps } from 'react-markdown';
import type { CodeBlockLanguage } from '../CodeBlock/CodeBlock.type';

type MarkdownSize = 'sm' | 'md';

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

interface MarkdownImageProps extends ExtraProps {
  alt?: string;
}

type MarkdownNode = NonNullable<ExtraProps['node']>;

interface MarkdownCode {
  code: string;
  language: CodeBlockLanguage;
}

interface MarkdownTree {
  children?: { type: string; depth?: number }[];
}

export type {
  MarkdownCode, MarkdownHeadingOffset, MarkdownImageProps, MarkdownLinkHandler, MarkdownLinkProps, MarkdownListProps, MarkdownNode,
  MarkdownPartProps, MarkdownProps, MarkdownSettings, MarkdownSize, MarkdownTree,
};
