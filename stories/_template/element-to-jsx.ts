/* @layer stories @kind logic */
import { isValidElement } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { dataLiteral } from './data-literal';
import { INDENT, LINE, MAX_STRING } from './jsx-format';

const shorten = (value: string): string => (value.length > MAX_STRING ? `${value.slice(0, MAX_STRING)}...` : value);

type NamedType = { displayName?: string; name?: string; render?: NamedType; type?: NamedType };

const ownNames = (t: NamedType | undefined): string[] => (t ? [t.displayName ?? '', t.name ?? ''] : []);

const typeName = (type: unknown): string => {
  if (typeof type === 'string') return type;
  const t = type as NamedType | undefined;
  const candidates = [...ownNames(t), ...ownNames(t?.render), t?.type?.name ?? ''];
  return candidates.find((candidate) => candidate !== '') ?? 'Component';
};

const isNodeList = (node: ReactNode): node is readonly ReactNode[] => Array.isArray(node);

const inlineText = (inner: readonly string[]): string | null => {
  const single = inner.length === 1 ? inner[0]?.trim() : undefined;
  return single !== undefined && !single.startsWith('<') ? single : null;
};

const propText = ([name, value]: [string, unknown], indent: string): string | null => {
  if (value === undefined || value === false || name === 'children' || name === 'key' || name === 'ref') return null;
  if (value === true) return name;
  if (typeof value === 'string') return `${name}=${JSON.stringify(shorten(value))}`;
  return `${name}={${dataLiteral(value, indent, elementToJsx)}}`;
};

const childLines = (children: ReactNode, indent: string): string[] =>
  (isNodeList(children) ? children : [children]).flatMap((child): string[] => {
    if (child === null || child === undefined || typeof child === 'boolean') return [];
    if (isNodeList(child)) return childLines(child, indent);
    if (isValidElement(child)) return [elementToJsx(child, indent)];
    return [`${indent}${String(child)}`];
  });

const openTag = (name: string, attrs: readonly string[], indent: string): { tag: string; broken: boolean } => {
  const oneLine = `${indent}<${name}${attrs.map((a) => ` ${a}`).join('')}`;
  if (oneLine.length <= LINE && !oneLine.includes('\n')) return { tag: oneLine, broken: false };
  return { tag: `${indent}<${name}\n${attrs.map((a) => `${indent}${INDENT}${a}`).join('\n')}\n${indent}`, broken: true };
};

const elementToJsx = (element: ReactElement, indent = '', rootName?: string): string => {
  const name = rootName ?? typeName(element.type);
  const props = element.props as Record<string, unknown>;
  const attrs = Object.entries(props).map((entry) => propText(entry, indent + INDENT)).filter((p): p is string => p !== null);
  const { tag, broken } = openTag(name, attrs, indent);
  const inner = childLines(props.children as ReactNode, indent + INDENT);
  if (!inner.length) return broken ? `${tag}/>` : `${tag} />`;
  const text = inlineText(inner);
  if (!broken && text !== null && `${tag}>${text}</${name}>`.length <= LINE) return `${tag}>${text}</${name}>`;
  return `${tag}>\n${inner.join('\n')}\n${indent}</${name}>`;
};

export { elementToJsx };
