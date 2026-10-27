/* @layer renderer-components @kind util */
const slotOf = (sizes: readonly number[], column: number, index: number): number =>
  sizes.slice(0, column).reduce((start, size) => start + size + 1, 0) + index;

export { slotOf };
