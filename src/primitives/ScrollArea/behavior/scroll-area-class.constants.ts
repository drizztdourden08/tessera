/* @layer renderer-components @kind constants */
import type { ScrollAreaGutter } from '../ScrollArea.type';

const GUTTER_CLASS: Record<ScrollAreaGutter, string> = {
  auto: '',
  stable: 'scroll-area--stable-gutter',
  both: 'scroll-area--both-gutter',
};

export { GUTTER_CLASS };
