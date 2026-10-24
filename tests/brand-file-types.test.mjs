/* @layer tooling-scripts @kind test */
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { BRAND_FAMILY } from '../src/brand/family.constants';
import { fileTypeArt } from '../src/brand/file-types/file-type-art';
import { fileTypeGlyph } from '../src/brand/file-types/file-type-glyph';
import { fileTypeFiles } from '../src/brand/file-types/file-type-files';
import { fileTypeGridFor } from '../src/brand/file-types/file-type-grid-for';
import { FILE_TYPE_GRIDS, FILE_TYPE_LAYOUTS } from '../src/brand/file-types/file-type-layouts.constants';
import { ICON_SIZES } from '../src/brand/icon-sizes.constants';
import { PIXEL_ICONS } from '../src/primitives/icon-sets/pixel.constants';

const { fileTypes } = BRAND_FAMILY.bxel;
const BRAND = path.resolve('brand');

describe('the Bxel file types', () => {
  it('covers the six kinds Bxel saves, each with its own extension', () => {
    expect(fileTypes.types.map((type) => type.ext)).toEqual(['bxsprite', 'bxsheet', 'bxpalette', 'bxtiles', 'bxmap', 'bxproject']);
  });

  it('names a pixel icon for every glyph', () => {
    for (const type of fileTypes.types) expect(PIXEL_ICONS[type.icon], type.icon).toBeDefined();
  });

  it('fits every glyph inside its box on every grid', () => {
    for (const type of fileTypes.types) {
      for (const grid of FILE_TYPE_GRIDS) {
        const glyph = fileTypeGlyph(type, grid);
        const box = FILE_TYPE_LAYOUTS[grid].glyph;
        expect(glyph.length, `${type.kind} ${grid}`).toBeLessThanOrEqual(box.h);
        expect(Math.max(...glyph.map((row) => row.length)), `${type.kind} ${grid}`).toBeLessThanOrEqual(box.w);
      }
    }
  });

  it('draws each icon as pixel art on its own square grid', () => {
    const art = fileTypeArt(fileTypes.look, fileTypes.types[0], 32);
    expect(art).toMatchObject({ viewBox: '0 0 32 32', pixelArt: true });
    expect(art.paths.map((p) => p.ink)).toContain(fileTypes.look.glyph);
  });

  it('picks the largest grid that divides the size, else the 32 grid', () => {
    expect([16, 24, 32, 48, 64, 128, 256, 512, 1024, 100].map(fileTypeGridFor)).toEqual([16, 24, 32, 24, 32, 32, 32, 32, 32, 32]);
  });

  it('writes every file the packager copies for each extension', () => {
    for (const files of fileTypeFiles('bxel')) {
      const wanted = [files.svg, files.icns, files.ico, ...ICON_SIZES.ladder.map(files.ladder)];
      for (const file of wanted) expect(fs.existsSync(path.join(BRAND, file)), file).toBe(true);
    }
    expect(fileTypeFiles('rotp')).toEqual([]);
  });
});
