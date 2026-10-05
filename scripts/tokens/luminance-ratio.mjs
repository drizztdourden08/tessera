/* @layer tooling-scripts @kind logic */
const luminanceRatio = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

export { luminanceRatio };
