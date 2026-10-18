/* @layer renderer-components @kind logic */
import type { ResizeOptions } from './resize-options.type';

const ariaMinOf = (options: ResizeOptions): number => (options.fold?.sides.includes('low') ? 0 : Math.round(options.min));

export { ariaMinOf };
