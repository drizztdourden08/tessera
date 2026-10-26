/* @layer renderer-components @kind logic */
import type { ScrollAreaGutter } from '../ScrollArea.type';

const scrollAreaClass = (gutter: ScrollAreaGutter, className: string): string =>
  ['scroll-area', gutter === 'stable' ? 'scroll-area--stable-gutter' : '', className].filter(Boolean).join(' ');

export { scrollAreaClass };
