/* @layer renderer-components @kind data */
import type { PixelGrid } from '../../primitives/Icon/Icon.type';
import type { FileTypeSmallGrid } from './file-type.type';

const BXEL_ANIMATION_GLYPH: Readonly<Record<FileTypeSmallGrid, PixelGrid>> = {
  24: [
    '################',
    '##..###..###..##',
    '################',
    '#....#....#....#',
    '#....#....#.#..#',
    '#....#..#.#....#',
    '#.#..#....#....#',
    '#....#....#....#',
    '################',
    '##..###..###..##',
    '################',
  ],
  16: [
    '##########',
    '#.##.##.##',
    '##########',
    '#..#..#..#',
    '#..#..#..#',
    '##########',
    '#.##.##.##',
    '##########',
  ],
};

export { BXEL_ANIMATION_GLYPH };
