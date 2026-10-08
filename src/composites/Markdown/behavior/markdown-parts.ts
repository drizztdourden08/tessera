/* @layer renderer-components @kind data */
import type { Components } from 'react-markdown';
import { MarkdownCodeBlock } from '../sub-components/MarkdownCodeBlock';
import { MarkdownHeading } from '../sub-components/MarkdownHeading';
import { MarkdownImage } from '../sub-components/MarkdownImage';
import { MarkdownInline } from '../sub-components/MarkdownInline';
import { MarkdownLink } from '../sub-components/MarkdownLink';
import { MarkdownList } from '../sub-components/MarkdownList';
import { MarkdownListItem } from '../sub-components/MarkdownListItem';
import { MarkdownParagraph } from '../sub-components/MarkdownParagraph';
import { MarkdownQuote } from '../sub-components/MarkdownQuote';
import { MarkdownRule } from '../sub-components/MarkdownRule';

const markdownParts: Components = {
  h1: MarkdownHeading,
  h2: MarkdownHeading,
  h3: MarkdownHeading,
  h4: MarkdownHeading,
  h5: MarkdownHeading,
  h6: MarkdownHeading,
  p: MarkdownParagraph,
  blockquote: MarkdownQuote,
  ul: MarkdownList,
  ol: MarkdownList,
  li: MarkdownListItem,
  strong: MarkdownInline,
  em: MarkdownInline,
  code: MarkdownInline,
  a: MarkdownLink,
  pre: MarkdownCodeBlock,
  hr: MarkdownRule,
  img: MarkdownImage,
};

export { markdownParts };
