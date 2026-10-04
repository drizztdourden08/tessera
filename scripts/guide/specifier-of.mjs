/* @layer tooling-scripts @kind logic */
const specifierOf = (packageName, key) => (key === '.' ? packageName : `${packageName}${key.slice(1)}`);

export { specifierOf };
