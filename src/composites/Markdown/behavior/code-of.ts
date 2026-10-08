/* @layer renderer-components @kind util */
import { CODE_LANGUAGES, LANGUAGE_PREFIX } from '../Markdown.constants';
import type { MarkdownCode, MarkdownNode } from '../Markdown.type';

const languageOf = (classes: unknown): string => {
  const names = Array.isArray(classes) ? classes.map(String) : [];
  return names.find((name) => name.startsWith(LANGUAGE_PREFIX))?.slice(LANGUAGE_PREFIX.length) ?? '';
};

const codeOf = (pre: MarkdownNode | undefined): MarkdownCode => {
  const inner = pre?.children.find((child) => child.type === 'element' && child.tagName === 'code');
  if (inner?.type !== 'element') return { code: '', language: 'text' };
  const code = inner.children.map((child) => (child.type === 'text' ? child.value : '')).join('').replace(/\n$/, '');
  return { code, language: CODE_LANGUAGES[languageOf(inner.properties.className)] ?? 'text' };
};

export { codeOf };
