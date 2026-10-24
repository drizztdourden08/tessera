/* @layer renderer-components @kind data */
import { BXEL_INK } from '../marks/bxel.constants';
import { BXEL_FILE_GLYPHS } from './bxel-file-glyphs.constants';
import type { BrandFileTypes, FileTypeInk } from './file-type.type';

const BADGE_INKS: Readonly<Record<string, FileTypeInk>> = {
  c: { ink: BXEL_INK.crimson },
  r: { ink: BXEL_INK.coral },
  m: { ink: BXEL_INK.magenta },
  v: { ink: BXEL_INK.violet },
};

const BXEL_FILE_TYPES: BrandFileTypes = {
  look: {
    page: BXEL_INK.deep,
    edge: BXEL_INK.lilac,
    fold: BXEL_INK.violet,
    glyph: BXEL_INK.mist,
    badge: {
      32: { inks: BADGE_INKS, grid: ['..rcc.', 'm.c..c', '..ccc.', 'v.c..c', '..ccc.'] },
      24: { inks: BADGE_INKS, grid: ['rc.', 'c.c', 'cc.', 'c.c', 'cc.'] },
      16: { inks: BADGE_INKS, grid: ['rc', 'cc'] },
    },
  },
  types: [
    { kind: 'sprite', ext: 'bxsprite', name: 'Sprite', icon: 'pixel-sprite', small: BXEL_FILE_GLYPHS.sprite },
    { kind: 'sheet', ext: 'bxsheet', name: 'Sheet', icon: 'pixel-atlas', small: BXEL_FILE_GLYPHS.sheet },
    { kind: 'palette', ext: 'bxpalette', name: 'Palette', icon: 'pixel-palette', small: BXEL_FILE_GLYPHS.palette },
    { kind: 'tileset', ext: 'bxtiles', name: 'Tileset', icon: 'pixel-tileset', small: BXEL_FILE_GLYPHS.tileset },
    { kind: 'tilemap', ext: 'bxmap', name: 'Tilemap', icon: 'pixel-tilemap', small: BXEL_FILE_GLYPHS.tilemap },
    { kind: 'project', ext: 'bxproject', name: 'Project', icon: 'pixel-project', small: BXEL_FILE_GLYPHS.project },
    { kind: 'legacy', ext: 'bxel', name: 'Legacy', icon: 'pixel-legacy', small: BXEL_FILE_GLYPHS.legacy },
  ],
};

export { BXEL_FILE_TYPES };
