/* @layer renderer-components @kind logic */
const keyOf = (path: string): string => path.slice(path.lastIndexOf('.') + 1);

export { keyOf };
