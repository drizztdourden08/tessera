/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const area = readFileSync('src/primitives/ScrollArea/ScrollArea.css', 'utf8');
const slim = area.slice(area.indexOf(".scroll-area[data-scrollbar='slim'] {"));
const image = slim.slice(slim.indexOf('background-image:'), slim.indexOf('background-repeat'));
const half = 'calc(var(--scroll-thumb-w) / 2)';

describe('ScrollArea slim thumb rounding', () => {
  it('caps both ends of each axis with a circle of half the thumb width', () => {
    const caps = image.match(/radial-gradient\(circle calc\(var\(--scroll-thumb-w\) \/ 2\)/g) ?? [];
    expect(caps).toHaveLength(4);
    expect(image).toContain(`at 50% ${half},`);
    expect(image).toContain(`at 50% calc(100% - var(--scroll-thumb-w) / 2),`);
    expect(image).toContain(`at ${half} 50%,`);
    expect(image).toContain(`at calc(100% - var(--scroll-thumb-w) / 2) 50%,`);
  });

  it('starts the straight body where the caps end, so no square end shows', () => {
    expect(image).toContain(`linear-gradient(to bottom, transparent ${half}, var(--scroll-thumb-color) ${half}`);
    expect(image).toContain(`linear-gradient(to right, transparent ${half}, var(--scroll-thumb-color) ${half}`);
  });

  it('gives body and caps the same size and place, so length, position and hit area are unchanged', () => {
    const lists = (property) => slim.slice(slim.indexOf(`${property}:`)).split(';')[0].split('\n').slice(1).map((line) => line.replace(/,$/, ''));
    const position = lists('background-position');
    const size = lists('background-size');
    expect(position).toHaveLength(6);
    expect(size).toHaveLength(6);
    expect(new Set(position.slice(0, 3)).size).toBe(1);
    expect(new Set(position.slice(3)).size).toBe(1);
    expect(new Set(size.slice(0, 3)).size).toBe(1);
    expect(new Set(size.slice(3)).size).toBe(1);
  });

  it('leaves the colour variable and the width variable as the only inputs', () => {
    expect(slim).toContain('--scroll-thumb-color: var(--c-border-strong);');
    expect(image).not.toMatch(/\d+px|#[0-9a-f]{3}/i);
  });
});
