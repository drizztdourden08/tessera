/* @layer stories @kind logic */
import { MARKUP_PIECE, SAFE_HREF } from './description.constants';
import type { MarkupToken } from './description.type';
import { shortcutKeys } from './shortcut-keys';

type Groups = Partial<Record<'code' | 'strong' | 'em' | 'keys' | 'label' | 'href' | 'page', string>>;

const keysToken = (combo: string, raw: string): MarkupToken => {
  const keys = shortcutKeys(combo);
  return keys === null ? { kind: 'text', text: raw } : { kind: 'keys', keys };
};

const linkToken = (text: string, href: string, raw: string): MarkupToken =>
  (SAFE_HREF.test(href) ? { kind: 'link', text, href } : { kind: 'text', text: raw });

const pageToken = (path: string): MarkupToken => ({ kind: 'page', name: path.split('/').pop() ?? path, path });

const tokenFor = (groups: Groups, raw: string): MarkupToken => {
  if (groups.code !== undefined) return { kind: 'code', text: groups.code };
  if (groups.strong !== undefined) return { kind: 'strong', children: parseMarkup(groups.strong) };
  if (groups.em !== undefined) return { kind: 'em', children: parseMarkup(groups.em) };
  if (groups.keys !== undefined) return keysToken(groups.keys, raw);
  if (groups.href !== undefined) return linkToken(groups.label ?? '', groups.href, raw);
  return pageToken(groups.page ?? raw);
};

const parseMarkup = (text: string): MarkupToken[] => {
  const tokens: MarkupToken[] = [];
  let last = 0;
  for (const match of text.matchAll(MARKUP_PIECE)) {
    if (match.index > last) tokens.push({ kind: 'text', text: text.slice(last, match.index) });
    tokens.push(tokenFor(match.groups ?? {}, match[0]));
    last = match.index + match[0].length;
  }
  if (last < text.length) tokens.push({ kind: 'text', text: text.slice(last) });
  return tokens;
};

export { parseMarkup };
