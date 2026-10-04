/* @layer tooling-scripts @kind logic */
const blockOf = (className) => className.split(/__|--/)[0];

export { blockOf };
