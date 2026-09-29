/* @layer stories @kind logic */
import { isValidElement } from 'react';
import type { ReactElement } from 'react';
import { INDENT, LINE, MAX_DEPTH, MAX_ITEMS, MAX_STRING } from './jsx-format';

type ElementPrinter = (element: ReactElement, indent: string) => string;

type Brackets = readonly [open: string, close: string, pad: string];

interface Printing {
  indent: string;
  depth: number;
  element: ElementPrinter;
}

const IDENTIFIER = /^[A-Za-z_$][\w$]*$/;
const ARRAY: Brackets = ['[', ']', ''];
const OBJECT: Brackets = ['{', '}', ' '];

const quote = (text: string): string => {
  const cut = text.length > MAX_STRING ? `${text.slice(0, MAX_STRING)}...` : text;
  return `'${cut.replace(/\\/g, '\\\\').replace(/'/g, '\\\'').replace(/\n/g, '\\n')}'`;
};

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (typeof value !== 'object' || value === null) return false;
  const proto: unknown = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
};

const group = (brackets: Brackets, parts: readonly string[], indent: string): string => {
  const [open, close, pad] = brackets;
  if (!parts.length) return `${open}${close}`;
  const flat = `${open}${pad}${parts.join(', ')}${pad}${close}`;
  if (!flat.includes('\n') && indent.length + flat.length <= LINE) return flat;
  const inner = indent + INDENT;
  return `${open}\n${parts.map((part) => `${inner}${part},`).join('\n')}\n${indent}${close}`;
};

const deeper = (printing: Printing): Printing => ({ ...printing, indent: printing.indent + INDENT, depth: printing.depth + 1 });

const arrayText = (items: readonly unknown[], printing: Printing): string => {
  const next = deeper(printing);
  const shown = items.slice(0, MAX_ITEMS).map((item) => print(item, next));
  const more = items.length - shown.length;
  return group(ARRAY, more > 0 ? [...shown, `/* ${more} more */`] : shown, printing.indent);
};

const objectText = (record: Record<string, unknown>, printing: Printing): string => {
  const next = deeper(printing);
  const parts = Object.entries(record)
    .filter(([, item]) => item !== undefined)
    .map(([key, item]) => `${IDENTIFIER.test(key) ? key : quote(key)}: ${print(item, next)}`);
  return group(OBJECT, parts, printing.indent);
};

const scalarText = (value: unknown): string => {
  if (typeof value === 'string') return quote(value);
  if (typeof value === 'bigint') return `${value}n`;
  if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'symbol') return String(value);
  return value === null ? 'null' : 'undefined';
};

const print = (value: unknown, printing: Printing): string => {
  if (typeof value === 'function') return '() => {}';
  if (isValidElement(value)) return printing.element(value, printing.indent).trimStart();
  if (typeof value !== 'object' || value === null) return scalarText(value);
  if (printing.depth > MAX_DEPTH) return '{...}';
  if (Array.isArray(value)) return arrayText(value, printing);
  return isPlainObject(value) ? objectText(value, printing) : '{...}';
};

const dataLiteral = (value: unknown, indent: string, element: ElementPrinter): string =>
  print(value, { indent, depth: 0, element });

export { dataLiteral };
