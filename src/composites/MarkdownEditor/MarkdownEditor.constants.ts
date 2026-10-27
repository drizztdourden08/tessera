/* @layer renderer-components @kind data */
import type { MarkdownEditorActionId, MarkdownEditorActionSpec } from './MarkdownEditor.type';

const MARKDOWN_EDITOR_ACTIONS: readonly MarkdownEditorActionSpec[] = [
  { id: 'bold', icon: 'bold', key: 'B' },
  { id: 'italic', icon: 'italic', key: 'I' },
  { id: 'list', icon: 'list' },
  { id: 'numberedList', icon: 'list-ordered' },
  { id: 'quote', icon: 'quote' },
  { id: 'link', icon: 'link', key: 'K' },
  { id: 'code', icon: 'code' },
  { id: 'codeBlock', icon: 'square-code' },
];

const MARKDOWN_EDITOR_GROUPS: readonly (readonly MarkdownEditorActionId[])[] = [
  ['bold', 'italic'],
  ['list', 'numberedList'],
  ['quote', 'link', 'code', 'codeBlock'],
];

const SPLIT_MIN_WIDTH = 640;

const DEFAULT_ROWS = 12;

const COMPACT_ROWS = 3;

const ICON_SIZE = 16;

const LINK_PLACEHOLDER = 'https://';

const URL_PATTERN = /^https?:\/\/\S+$/i;

const COUNTER_FROM = 0.9;

const FENCE = '```';

const FENCED_PATTERN = /^```[^\n]*\n([\s\S]*?)\n?```$/;

export { COMPACT_ROWS, COUNTER_FROM, DEFAULT_ROWS, FENCE, FENCED_PATTERN, ICON_SIZE, LINK_PLACEHOLDER, MARKDOWN_EDITOR_ACTIONS, MARKDOWN_EDITOR_GROUPS, SPLIT_MIN_WIDTH, URL_PATTERN };
