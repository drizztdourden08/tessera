/* @layer renderer-components @kind util */
import { SUBPIXEL_SLACK } from '../Quote.constants';
import type { QuoteLayout } from '../Quote.type';

const needsMultiline = (layout: QuoteLayout, reserve: number, wasMultiline: boolean): boolean => {
  if (!wasMultiline) return layout.lines > 1;
  return layout.textWidth + reserve + layout.slack > layout.room + SUBPIXEL_SLACK;
};

export { needsMultiline };
