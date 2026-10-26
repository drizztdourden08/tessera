/* @layer renderer-components @kind util */
import { Children, isValidElement } from 'react';
import type { ReactNode } from 'react';
import { MarkdownList } from '../sub-components/MarkdownList';
import { MarkdownParagraph } from '../sub-components/MarkdownParagraph';
import { MarkdownTaskBox } from '../sub-components/MarkdownTaskBox';
import type { MarkdownPartProps, TaskParts } from '../Markdown.type';

const isNested = (child: ReactNode): boolean => isValidElement(child) && child.type === MarkdownList;

const textOf = (child: ReactNode): ReactNode => (isValidElement<MarkdownPartProps>(child) && child.type === MarkdownParagraph ? child.props.children : child);

const isBlank = (part: ReactNode): boolean => typeof part === 'string' && part.trim() === '';

const trimEdge = (parts: ReactNode[], trim: (text: string) => string): ReactNode[] => {
  const at = parts.findIndex((part) => !isBlank(part));
  const rest = at < 0 ? [] : parts.slice(at);
  const [head, ...tail] = rest;
  return typeof head === 'string' ? [trim(head), ...tail] : rest;
};

const trimEnds = (parts: ReactNode[]): ReactNode[] => {
  const front = trimEdge(parts, (text) => text.trimStart());
  return trimEdge(front.reverse(), (text) => text.trimEnd()).reverse();
};

const isBox = (child: ReactNode): boolean => isValidElement(child) && child.type === MarkdownTaskBox;

const splitTask = (children: ReactNode): TaskParts => {
  const all = Children.toArray(children).filter((child) => !isBox(child));
  return { label: trimEnds(all.filter((child) => !isNested(child)).map(textOf)), nested: all.filter(isNested) };
};

export { splitTask };
