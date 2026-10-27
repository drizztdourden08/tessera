/* @layer renderer-components @kind types */
import type { CSSProperties, ReactNode } from 'react';
import type { ExtraProps } from 'react-markdown';
import type { LinkTone } from '../../primitives/Link/Link.type';
import type { CodeBlockLanguage } from '../CodeBlock/CodeBlock.type';

type MarkdownSize = 'sm' | 'md' | 'inline';

type MarkdownHeadingOffset = 0 | 1 | 2 | 3 | 4 | 5;

type MarkdownLinkHandler = (href: string) => void;

interface MarkdownImageTarget {
  src: string;
  alt: string;
}

type MarkdownImageHandler = (image: MarkdownImageTarget) => void;

type MarkdownImageResolver =(src: string) => string | undefined;

type MarkdownImages = boolean | MarkdownImageResolver;

interface MarkdownLinkId {
  pattern: RegExp;
  href: (match: string) => string | undefined;
}

interface MarkdownProps {
  children?: string;
  source?: string;
  onLink?: MarkdownLinkHandler;
  headingOffset?: MarkdownHeadingOffset;
  hideTitle?: boolean;
  size?: MarkdownSize;
  images?: MarkdownImages;
  onImage?: MarkdownImageHandler;
  linkIds?: MarkdownLinkId | MarkdownLinkId[];
  smartTimes?: boolean;
  linkTone?: LinkTone;
  idLinkTone?: LinkTone;
  className?: string;
}

interface MarkdownSettings {
  onLink?: MarkdownLinkHandler;
  headingOffset: MarkdownHeadingOffset;
  size: MarkdownSize;
  images?: MarkdownImages;
  onImage?: MarkdownImageHandler;
  linkTone?: LinkTone;
  idLinkTone?: LinkTone;
}

interface MarkdownPartProps extends ExtraProps {
  children?: ReactNode;
}

interface MarkdownLinkProps extends MarkdownPartProps {
  href?: string;
  'data-id-link'?: string;
}

interface MarkdownListProps extends MarkdownPartProps {
  start?: number;
}

interface MarkdownCellProps extends MarkdownPartProps {
  style?: CSSProperties;
}

interface MarkdownImageProps extends ExtraProps {
  alt?: string;
  src?: string;
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

interface MarkdownTextNode {
  type: string;
  value?: string;
  url?: string;
  title?: string | null;
  data?: { hProperties: Record<string, string> };
  children?: MarkdownTextNode[];
}

interface MarkdownTextTree {
  children?: MarkdownTextNode[];
}

interface LinkIdsOptions {
  rules: MarkdownLinkId[];
  allowPaths: boolean;
}

interface RemarkPluginOptions extends LinkIdsOptions {
  hideTitle: boolean;
  smart: boolean;
}

export type {
  LinkIdsOptions, MarkdownCellProps, MarkdownChild, MarkdownCode, MarkdownHeadingOffset, MarkdownImageHandler, MarkdownImageProps, MarkdownImageResolver, MarkdownImageTarget, MarkdownImages, MarkdownLinkHandler,
  MarkdownLinkId, MarkdownLinkProps, MarkdownListProps, MarkdownNode, MarkdownPartProps, MarkdownProps, MarkdownSettings, MarkdownSize, MarkdownTextNode, MarkdownTextTree,
  MarkdownTree, RemarkPluginOptions, TaskParts,
};
