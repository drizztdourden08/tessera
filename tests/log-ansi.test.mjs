/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { LogPanel } from '../src/composites/LogPanel';
import { ansiClass } from '../src/composites/LogPanel/behavior/ansi-class';
import { ansiLogAsText } from '../src/composites/LogPanel/behavior/ansi-log-as-text';
import { parseAnsi } from '../src/composites/LogPanel/behavior/parse-ansi';
import { stripAnsi } from '../src/composites/LogPanel/behavior/strip-ansi';

const E = '\u001b[';
const PLAIN = { fg: null, bg: null, bold: false, dim: false, italic: false, underline: false };
const span = (text, style = {}) => ({ ...PLAIN, ...style, text });

describe('parseAnsi, colours', () => {
  it('gives plain text as one span', () => {
    expect(parseAnsi('hello')).toEqual([span('hello')]);
    expect(parseAnsi('')).toEqual([]);
  });

  it('maps 30 to 37 and 90 to 97 to the sixteen foregrounds', () => {
    expect(parseAnsi(`${E}31mred${E}0m`)).toEqual([span('red', { fg: 1 })]);
    expect(parseAnsi(`${E}37mw${E}90mg${E}97mb`)).toEqual([span('w', { fg: 7 }), span('g', { fg: 8 }), span('b', { fg: 15 })]);
  });

  it('maps 40 to 47 and 100 to 107 to the eight backgrounds', () => {
    expect(parseAnsi(`${E}42mgreen`)).toEqual([span('green', { bg: 2 })]);
    expect(parseAnsi(`${E}101mbright`)).toEqual([span('bright', { bg: 1 })]);
  });

  it('resets the foreground with 39 and the background with 49', () => {
    expect(parseAnsi(`${E}31;42mab${E}39mcd${E}49mef`)).toEqual([span('ab', { fg: 1, bg: 2 }), span('cd', { bg: 2 }), span('ef')]);
  });
});

describe('parseAnsi, attributes', () => {
  it('sets bold, dim, italic and underline, and 22 to 24 clear them', () => {
    expect(parseAnsi(`${E}1;3;4mx${E}22;23;24my`)).toEqual([span('x', { bold: true, italic: true, underline: true }), span('y')]);
    expect(parseAnsi(`${E}2mdim${E}22mnormal`)).toEqual([span('dim', { dim: true }), span('normal')]);
  });

  it('resets everything with 0, with m alone, and with an empty parameter', () => {
    expect(parseAnsi(`${E}1;31ma${E}0mb`)).toEqual([span('a', { bold: true, fg: 1 }), span('b')]);
    expect(parseAnsi(`${E}1ma${E}mb`)).toEqual([span('a', { bold: true }), span('b')]);
    expect(parseAnsi(`${E}1;31ma${E};31mb`)).toEqual([span('a', { bold: true, fg: 1 }), span('b', { fg: 1 })]);
  });

  it('keeps the style across text until the next code', () => {
    expect(parseAnsi(`${E}32mone ${E}1mtwo`)).toEqual([span('one ', { fg: 2 }), span('two', { fg: 2, bold: true })]);
  });
});

describe('parseAnsi, 256 and true colour', () => {
  it('maps 256-colour codes to the nearest of the sixteen', () => {
    expect(parseAnsi(`${E}38;5;1mA`)).toEqual([span('A', { fg: 1 })]);
    expect(parseAnsi(`${E}38;5;9mA`)).toEqual([span('A', { fg: 9 })]);
    expect(parseAnsi(`${E}38;5;196mA`)[0]?.fg).toBe(1);
    expect(parseAnsi(`${E}38;5;210mA`)[0]?.fg).toBe(9);
    expect(parseAnsi(`${E}38;5;232mA`)[0]?.fg).toBe(0);
    expect(parseAnsi(`${E}38;5;255mA`)[0]?.fg).toBe(7);
    expect(parseAnsi(`${E}48;5;21mA`)[0]?.bg).toBe(4);
  });

  it('maps true colour to the nearest of the sixteen', () => {
    expect(parseAnsi(`${E}38;2;255;90;90mA`)[0]?.fg).toBe(9);
    expect(parseAnsi(`${E}48;2;10;10;10mA`)[0]?.bg).toBe(0);
  });

  it('reads the codes after an extended colour as codes of their own', () => {
    expect(parseAnsi(`${E}38;5;1;1mA`)).toEqual([span('A', { fg: 1, bold: true })]);
    expect(parseAnsi(`${E}38;2;255;90;90;4mA`)[0]).toMatchObject({ fg: 9, underline: true });
  });

  it('ignores an extended colour that is cut short or of an unknown kind', () => {
    expect(parseAnsi(`${E}38mA`)).toEqual([span('A')]);
    expect(parseAnsi(`${E}38;9;1mA`)[0]?.fg).toBe(null);
  });
});

describe('parseAnsi, other escape codes', () => {
  it('strips cursor and erase codes', () => {
    expect(parseAnsi(`a${E}2K${E}1Gb${E}?25lc`)).toEqual([span('abc')]);
    expect(stripAnsi(`${E}31mred${E}0m and ${E}2Jgone`)).toBe('red and gone');
  });

  it('strips operating system commands ended by a bell or a string terminator', () => {
    expect(stripAnsi('\u001b]0;title\u0007text')).toBe('text');
    expect(stripAnsi('\u001b]8;;https://example.com\u001b\\link\u001b]8;;\u001b\\')).toBe('link');
  });

  it('strips a lone escape and a cut sequence without eating the text after it', () => {
    expect(stripAnsi('a\u001bb')).toBe('ab');
    expect(stripAnsi('x\u001b')).toBe('x');
    expect(stripAnsi('ok\u001b]0;no end')).toBe('ok0;no end');
  });

  it('ignores codes it does not draw, such as reverse video', () => {
    expect(parseAnsi(`${E}7mx`)).toEqual([span('x')]);
  });
});

describe('ansiClass', () => {
  it('names a token class per colour and attribute, and nothing for plain text', () => {
    expect(ansiClass(PLAIN)).toBe('');
    expect(ansiClass({ ...PLAIN, fg: 9, bg: 2, bold: true })).toBe('log-panel__ansi--fg-bright-red log-panel__ansi--bg-green log-panel__ansi--bold');
    expect(ansiClass({ ...PLAIN, dim: true, italic: true, underline: true })).toBe('log-panel__ansi--dim log-panel__ansi--italic log-panel__ansi--underline');
  });
});

const row = (message) => ({ id: 'a', gutter: '', tag: '', kind: 'out', message });

describe('LogPanel ansi', () => {
  it('draws spans with classes and never injects markup', () => {
    const html = renderToStaticMarkup(h(LogPanel, { ansi: true, rows: [row(`${E}31m<b>bold</b>${E}0m`)] }));
    expect(html).toContain('log-panel__ansi--fg-red');
    expect(html).toContain('&lt;b&gt;bold&lt;/b&gt;');
    expect(html).not.toContain('<b>');
    expect(html).not.toContain('\u001b');
  });

  it('shows escape codes as they are when ansi is not set', () => {
    expect(renderToStaticMarkup(h(LogPanel, { rows: [row(`${E}31mx`)] }))).not.toContain('log-panel__ansi');
  });

  it('copies the text without the codes', () => {
    expect(ansiLogAsText([row(`${E}31mred${E}0m`)])).toBe(' [] red');
  });

  it('labels the jump button for a terminal and draws the input row only with onInput', () => {
    const rows = [row('x')];
    expect(renderToStaticMarkup(h(LogPanel, { ansi: true, rows, onInput: () => {} }))).toContain('log-panel__input-row');
    expect(renderToStaticMarkup(h(LogPanel, { ansi: true, rows }))).not.toContain('log-panel__input-row');
  });
});
