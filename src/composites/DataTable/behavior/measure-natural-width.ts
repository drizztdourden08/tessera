/* @layer renderer-components @kind logic */
import { naturalContentWidths } from './natural-content-widths';

const naturalContentWidth = (element: HTMLElement): number =>
  naturalContentWidths([element])[0] ?? 0;

export { naturalContentWidth };
