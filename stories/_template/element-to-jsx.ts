/* @layer stories @kind logic */
import { isValidElement } from 'react';
import type { ReactElement, ReactNode } from 'react';

const INDENT = '  ';
const LINE = 72;

const MAX_STRING = 60;

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

const literal = (value: unknown): string => {
  if (typeof value === 'function') return '() => {}';
  if (isValidElement(value)) return elementToJsx(value, '');
  const json = JSON.stringify(value);
  return json && json.length <= 60 ? json : '{...}';
};

const propText = ([name, value]: [string, unknown]): string | null => {
  if (value === undefined || value === false || name === 'children' || name === 'key' || name === 'ref') return null;
  if (value === true) return name;
  if (typeof value === 'string') return `${name}=${JSON.stringify(shorten(value))}`;
  return `${name}={${literal(value)}}`;
};

const childLines = (children: ReactNode, indent: string): string[] =>
  (isNodeList(children) ? children : [children]).flatMap((child): string[] => {
    if (child === null || child === undefined || typeof child === 'boolean') return [];
    if (isNodeList(child)) return childLines(child, indent);
    if (isValidElement(child)) return [elementToJsx(child, indent)];
    return [`${indent}${String(child)}`];
  });

const elementToJsx = (element: ReactElement, indent = '', rootName?: string): string => {
  const name = rootName ?? typeName(element.type);
  const props = element.props as Record<string, unknown>;
  const attrs = Object.entries(props).map(propText).filter((p): p is string => p !== null);
  const oneLine = `${indent}<${name}${attrs.map((a) => ` ${a}`).join('')}`;
  const open = oneLine.length <= LINE ? oneLine : `${indent}<${name}\n${attrs.map((a) => `${indent}${INDENT}${a}`).join('\n')}\n${indent}`;
  const inner = childLines(props.children as ReactNode, indent + INDENT);
  if (!inner.length) return `${open} />`;
  const text = inlineText(inner);
  if (text !== null && `${oneLine}>${text}</${name}>`.length <= LINE) return `${open}>${text}</${name}>`;
  return `${open}>\n${inner.join('\n')}\n${indent}</${name}>`;
};

export { elementToJsx };
