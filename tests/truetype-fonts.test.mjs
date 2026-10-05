/* @layer tooling-scripts @kind test */
import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import wawoff2 from 'wawoff2';
import { TRUETYPE_FACES } from '../scripts/fonts/fonts.constants.mjs';
import { readSfntFace } from './read-sfnt-face.mjs';

const TRUETYPE_SIGNATURE = '00010000';
const FAMILIES = { 600: 'Chakra Petch SemiBold', 700: 'Chakra Petch' };
const fontFile = (path) => new URL(`../fonts/${path}`, import.meta.url);

describe('TrueType copies of the title font', () => {
  it.each(TRUETYPE_FACES)('ships %s.ttf as TrueType', (face) => {
    expect(existsSync(fontFile(`${face}.ttf`))).toBe(true);
    expect(readFileSync(fontFile(`${face}.ttf`)).subarray(0, 4).toString('hex')).toBe(TRUETYPE_SIGNATURE);
  });

  it.each(TRUETYPE_FACES)('gives %s.ttf the family, weight and glyphs of its woff2', async (face) => {
    const truetype = readFileSync(fontFile(`${face}.ttf`));
    const decoded = await wawoff2.decompress(readFileSync(fontFile(`${face}.woff2`)));
    const weight = Number(face.match(/-(\d+)-normal$/)[1]);
    expect(readSfntFace(truetype)).toEqual({ family: FAMILIES[weight], weight });
    expect(readSfntFace(decoded)).toEqual(readSfntFace(truetype));
    expect(Buffer.compare(truetype, Buffer.from(decoded))).toBe(0);
  });
});
