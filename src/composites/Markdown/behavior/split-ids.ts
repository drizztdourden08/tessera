/* @layer renderer-components @kind util */
import type { MarkdownLinkId, MarkdownTextNode } from '../Markdown.type';
import { linkHref } from './link-href';

const globalOf = (pattern: RegExp): RegExp => new RegExp(pattern.source, pattern.global ? pattern.flags : `${pattern.flags}g`);

const textOf = (value: string): MarkdownTextNode => ({ type: 'text', value });

const linkOf = (url: string, value: string): MarkdownTextNode => ({ type: 'link', url, title: null, children: [textOf(value)], data: { hProperties: { dataIdLink: 'true' } } });

const splitIds = (value: string, rule: MarkdownLinkId, allowPaths: boolean): MarkdownTextNode[] => {
  const nodes: MarkdownTextNode[] = [];
  let from = 0;
  for (const found of value.matchAll(globalOf(rule.pattern))) {
    const url = found[0] ? linkHref(rule.href(found[0]) ?? '', allowPaths) : '';
    if (url) {
      if (found.index > from) nodes.push(textOf(value.slice(from, found.index)));
      nodes.push(linkOf(url, found[0]));
      from = found.index + found[0].length;
    }
  }
  if (from < value.length) nodes.push(textOf(value.slice(from)));
  return nodes;
};

export { splitIds };
