/* @layer tooling-scripts @kind logic */
const slashed = (path) => path.split('\\').join('/').replace(/\/$/, '');

export { slashed };
