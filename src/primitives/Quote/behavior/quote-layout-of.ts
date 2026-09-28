/* @layer renderer-components @kind util */
import { ownerWindowOf } from '../../dom/owner-window';
import { SPACE_TO_FONT_SIZE } from '../Quote.constants';
import type { QuoteLayout } from '../Quote.type';

const quoteLayoutOf = (root: HTMLElement, text: HTMLElement): QuoteLayout | null => {
  const rects = Array.from(text.getClientRects()).filter((rect) => rect.width > 0);
  const first = rects[0];
  if (!first) return null;
  const style = ownerWindowOf(root).getComputedStyle(root);
  const box = root.getBoundingClientRect();
  const start = style.direction === 'rtl' ? box.right - first.right : first.left - box.left;
  const space = Number.parseFloat(style.fontSize) * SPACE_TO_FONT_SIZE;
  return {
    lines: rects.length,
    textWidth: rects.reduce((sum, rect) => sum + rect.width, 0),
    start,
    room: root.clientWidth,
    slack: (rects.length - 1) * space,
  };
};

export { quoteLayoutOf };
