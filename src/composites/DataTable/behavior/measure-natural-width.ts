/* @layer renderer-components @kind logic */
import { naturalContentWidths } from './naturalContentWidths';

const naturalContentWidth = (element: HTMLElement): number =>
  naturalContentWidths([element])[0] ?? 0;

export { naturalContentWidth };
