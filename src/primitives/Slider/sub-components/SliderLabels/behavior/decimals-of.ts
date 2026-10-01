/* @layer renderer-components @kind util */
const decimalsOf = (...values: readonly number[]): number =>
  Math.max(0, ...values.map((value) => String(value).split('.')[1]?.length ?? 0));

export { decimalsOf };
