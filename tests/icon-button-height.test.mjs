/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const css = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const TOKENS = new Map(
  ['src/tokens/scale.css', 'src/tokens/size.css', 'src/tokens/typography.css']
    .flatMap((path) => [...css(path).matchAll(/(--[\w-]+):\s*([^;]+);/g)])
    .map((match) => [match[1], match[2].trim()]),
);

const px = (value) => {
  const own = value.match(/^var\((--[\w-]+)\)$/);
  if (own) return px(TOKENS.get(own[1]));
  const times = value.match(/^calc\(([\d.]+) \* var\((--[\w-]+)\)\)$/);
  if (times) return Number(times[1]) * px(`var(${times[2]})`);
  const plain = value.match(/^([\d.]+)px$/);
  if (plain) return Number(plain[1]);
  throw new Error(`cannot read ${value}`);
};

const rule = (sheet, selector) => {
  const body = sheet.match(new RegExp(`(?:^|\\n)${selector.replace(/[.-]/g, '\\$&')} \\{([^}]*)\\}`))?.[1] ?? '';
  return Object.fromEntries([...body.matchAll(/([\w-]+):\s*([^;]+);/g)].map((match) => [match[1], match[2].trim()]));
};

const BUTTON = css('src/primitives/Button/Button.css');
const ICON_BUTTON = css('src/primitives/IconButton/IconButton.css');

describe('IconButton height', () => {
  it.each([['xs', 20], ['sm', 28], ['md', 39]])('is as tall as a Button at %s, %i px, from the same token, and square', (size, height) => {
    const button = rule(BUTTON, `.btn--${size}`)['min-block-size'];
    const icon = rule(ICON_BUTTON, `.icon-btn--${size}`);
    expect(button).toBe(`var(--control-h-${size})`);
    expect(icon.height).toBe(button);
    expect(icon.width).toBe(button);
    expect(px(button)).toBe(height);
  });

  it('draws an icon with no size of its own at 12, 12 and 16 px', () => {
    expect(['xs', 'sm', 'md'].map((size) => px(rule(ICON_BUTTON, `.icon-btn--${size}`)['font-size']))).toEqual([12, 12, 16]);
  });
});
