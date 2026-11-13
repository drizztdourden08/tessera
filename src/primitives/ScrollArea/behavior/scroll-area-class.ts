/* @layer renderer-components @kind logic */
import type { ScrollAreaGutter } from '../ScrollArea.type';
import { GUTTER_CLASS } from './scroll-area-class.constants';

const scrollAreaClass = (gutter: ScrollAreaGutter, className: string): string =>
  ['scroll-area', GUTTER_CLASS[gutter], className].filter(Boolean).join(' ');

export { scrollAreaClass };
