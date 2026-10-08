/* @layer renderer-components @kind data */
import type { HeadingTag } from '../../primitives/Title/Title.type';
import type { CodeBlockLanguage } from '../CodeBlock/CodeBlock.type';
import type { MarkdownHeadingOffset } from './Markdown.type';

const LINK_PROTOCOLS: ReadonlySet<string> = new Set(['http:', 'https:', 'mailto:']);

const CODE_LANGUAGES: Partial<Record<string, CodeBlockLanguage>> = { ts: 'typescript', typescript: 'typescript', tsx: 'tsx', json: 'json' };

const LANGUAGE_PREFIX = 'language-';

const DEFAULT_HEADING_OFFSET: MarkdownHeadingOffset = 1;

const HEADING_TAGS: readonly HeadingTag[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

export { CODE_LANGUAGES, DEFAULT_HEADING_OFFSET, HEADING_TAGS, LANGUAGE_PREFIX, LINK_PROTOCOLS };
