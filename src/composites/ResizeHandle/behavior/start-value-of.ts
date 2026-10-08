/* @layer renderer-components @kind logic */
import type { ResizeOptions } from './resize-options.type';

const startValueOf = (options: ResizeOptions): number => options.measure?.() ?? options.value ?? options.min;

export { startValueOf };
