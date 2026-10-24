/* @layer renderer-components @kind logic */
import type { PixelGrid } from '../../primitives/Icon/Icon.type';
import { PIXEL_INK } from '../../primitives/Icon/behavior/pixel-grid.constants';
import type { BrandMarkData, BrandMarkPath } from '../brand.type';
import { filePagePart } from './file-page-part';
import { fileTypeGlyph } from './file-type-glyph';
import { FILE_TYPE_LAYOUTS } from './file-type-layouts.constants';
import type { FileTypeBox, FileTypeGrid, FileTypeInk, FileTypeLayer, FileTypeLook, FileTypePaint, FileTypeSpec } from './file-type.type';

const centred = (grid: PixelGrid, box: FileTypeBox): readonly [number, number] => [
  box.x + Math.floor((box.w - (grid[0]?.length ?? 0)) / 2),
  box.y + Math.floor((box.h - grid.length) / 2),
];

const paintLayer = (paint: FileTypePaint, [left, top]: readonly [number, number]): FileTypeLayer => (x, y) =>
  paint.inks[paint.grid[y - top]?.[x - left] ?? ''];

const inkKey = (ink: FileTypeInk): string => `${ink.ink} ${ink.opacity ?? 1}`;

const rowRuns = (cells: readonly (FileTypeInk | undefined)[], y: number): { ink: FileTypeInk; d: string }[] => {
  const runs: { ink: FileTypeInk; x: number; w: number }[] = [];
  cells.forEach((ink, x) => {
    const last = runs[runs.length - 1];
    if (!ink) return;
    if (last && last.x + last.w === x && inkKey(last.ink) === inkKey(ink)) last.w += 1;
    else runs.push({ ink, x, w: 1 });
  });
  return runs.map((run) => ({ ink: run.ink, d: `M${run.x} ${y}h${run.w}v1h-${run.w}z` }));
};

const pathsOf = (rows: readonly (readonly (FileTypeInk | undefined)[])[]): BrandMarkPath[] => {
  const grouped = new Map<string, { ink: FileTypeInk; d: string }>();
  rows.flatMap(rowRuns).forEach((run) => {
    const key = inkKey(run.ink);
    grouped.set(key, { ink: run.ink, d: `${grouped.get(key)?.d ?? ''}${run.d}` });
  });
  return [...grouped.values()].map(({ ink, d }) => (ink.opacity === undefined ? { ink: ink.ink, d } : { ink: ink.ink, opacity: ink.opacity, d }));
};

const fileTypeArt = (look: FileTypeLook, type: FileTypeSpec, grid: FileTypeGrid): BrandMarkData => {
  const layout = FILE_TYPE_LAYOUTS[grid];
  const glyph = fileTypeGlyph(type, grid);
  const page: FileTypeLayer = (x, y) => {
    const part = filePagePart(layout.page, x, y);
    return part ? { ink: look[part] } : undefined;
  };
  const layers = [
    page,
    paintLayer(look.badge[grid], layout.badge),
    paintLayer({ grid: glyph, inks: { [PIXEL_INK]: { ink: look.glyph } } }, centred(glyph, layout.glyph)),
  ];
  const rows = Array.from({ length: grid }, (_, y) => Array.from({ length: grid }, (__, x) =>
    layers.reduce<FileTypeInk | undefined>((under, layer) => layer(x, y) ?? under, undefined)));
  return { viewBox: `0 0 ${grid} ${grid}`, pixelArt: true, paths: pathsOf(rows) };
};

export { fileTypeArt };
