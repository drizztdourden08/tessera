/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Markdown } from '../src/composites/Markdown';
import { stripUnsafeChars } from '../src/composites/Markdown/behavior/strip-unsafe-chars';

const chars = (...codes) => String.fromCharCode(...codes);

const points = (...codes) => String.fromCodePoint(...codes);

const around = (code) => `a${points(code)}b`;

describe('stripUnsafeChars', () => {
  it('keeps tab, line feed and carriage return', () => {
    expect(stripUnsafeChars('a\tb\nc\r\nd')).toBe('a\tb\nc\r\nd');
  });

  it('drops the other C0 controls', () => {
    for (const code of [0x00, 0x07, 0x08, 0x0b, 0x0c, 0x0e, 0x1b, 0x1f]) {
      expect(stripUnsafeChars(around(code))).toBe('ab');
    }
  });

  it('drops the C1 controls and keeps the characters next to them', () => {
    for (const code of [0x80, 0x85, 0x9f]) {
      expect(stripUnsafeChars(around(code))).toBe('ab');
    }
    const kept = points(0x7f, 0xa0, 0xa1);
    expect(stripUnsafeChars(kept)).toBe(kept);
  });

  it('drops the private use area of the basic plane', () => {
    for (const code of [0xe000, 0xf000, 0xf8ff]) {
      expect(stripUnsafeChars(around(code))).toBe('ab');
    }
    const kept = points(0xd7ff, 0xf900);
    expect(stripUnsafeChars(kept)).toBe(kept);
  });

  it('drops planes 15 and 16 private use', () => {
    for (const code of [0xf0000, 0xffffd, 0x100000, 0x10ffff]) {
      expect(stripUnsafeChars(around(code))).toBe('ab');
    }
    const kept = points(0xeffff, 0x10000);
    expect(stripUnsafeChars(kept)).toBe(kept);
  });

  it('drops lone surrogates', () => {
    expect(stripUnsafeChars(`a${chars(0xd800)}b`)).toBe('ab');
    expect(stripUnsafeChars(`a${chars(0xdc00)}b`)).toBe('ab');
    expect(stripUnsafeChars(`a${chars(0xd83d)}`)).toBe('a');
    expect(stripUnsafeChars(`${chars(0xdc00)}${points(0x1f600)}`)).toBe(points(0x1f600));
  });

  it('keeps emoji and normal text untouched', () => {
    const family = points(0x1f468, 0x200d, 0x1f469, 0x200d, 0x1f467);
    const flag = points(0x1f1e8, 0x1f1e6);
    const text = `Cafe${points(0x301)} ${points(0x1f600)} ${family} ${flag} ${points(0x4e2d, 0x6587)} ${points(0x2603, 0xfe0f)} # Title\n\n- item\n`;
    expect(stripUnsafeChars(text)).toBe(text);
    expect(stripUnsafeChars('')).toBe('');
  });
});

describe('Markdown source cleaning', () => {
  it('strips the characters before parsing', () => {
    const source = `Hel${points(0)}lo ${points(0xe000)}world ${points(0xf0000)}ok ${points(0x1f600)}`;
    const html = renderToString(h(Markdown, { source }));
    expect(html).toContain(`Hello world ok ${points(0x1f600)}`);
  });
});
