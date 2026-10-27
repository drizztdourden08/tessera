/* @layer renderer-components @kind data */
import type { HeadingTag } from '../../primitives/Title/Title.type';
import type { CodeBlockLanguage } from '../CodeBlock/CodeBlock.type';
import type { TableAlign } from '../../primitives/Table';
import type { MarkdownHeadingOffset, MarkdownSize } from './Markdown.type';

const LINK_PROTOCOLS: ReadonlySet<string> = new Set(['http:', 'https:', 'mailto:']);

const IMAGE_PROTOCOLS: ReadonlySet<string> = new Set(['http:', 'https:']);

const LINK_ID_SKIP: ReadonlySet<string> = new Set(['link', 'linkReference', 'definition', 'image', 'imageReference', 'code', 'inlineCode', 'html']);

const CODE_LANGUAGES: Partial<Record<string, CodeBlockLanguage>> = { ts: 'typescript', typescript: 'typescript', tsx: 'tsx', json: 'json' };

const LANGUAGE_PREFIX = 'language-';

const DEFAULT_HEADING_OFFSET: MarkdownHeadingOffset = 1;

const DEFAULT_SIZE: MarkdownSize = 'md';

const TABLE_ALIGNS: readonly string[] = ['left', 'center', 'right'] satisfies TableAlign[];

const TASK_CLASS = 'task-list-item';

const NO_CHANGE = (): void => undefined;

const HEADING_TAGS: readonly HeadingTag[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

export { CODE_LANGUAGES, DEFAULT_HEADING_OFFSET, DEFAULT_SIZE, HEADING_TAGS, IMAGE_PROTOCOLS, LANGUAGE_PREFIX, LINK_ID_SKIP, LINK_PROTOCOLS, NO_CHANGE, TABLE_ALIGNS, TASK_CLASS };
