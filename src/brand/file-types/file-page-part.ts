/* @layer renderer-components @kind logic */
import type { FilePagePart, FileTypePage } from './file-type.type';

const rowRight = (page: FileTypePage, y: number): number => page.right - Math.max(0, page.fold - (y - page.top));

const inside = (page: FileTypePage, x: number, y: number): boolean =>
  y >= page.top && y <= page.bottom && x >= page.left && x <= rowRight(page, y);

const onRim = (page: FileTypePage, x: number, y: number): boolean =>
  x === page.left || x === rowRight(page, y) || y === page.top || y === page.bottom;

const foldPart = (page: FileTypePage, x: number, y: number): FilePagePart => {
  const foldLeft = page.right - page.fold;
  const foldBottom = page.top + page.fold;
  if (x < foldLeft || y > foldBottom) return 'page';
  return x === foldLeft || y === foldBottom ? 'edge' : 'fold';
};

const filePagePart = (page: FileTypePage, x: number, y: number): FilePagePart | null => {
  if (!inside(page, x, y)) return null;
  return onRim(page, x, y) ? 'edge' : foldPart(page, x, y);
};

export { filePagePart };
