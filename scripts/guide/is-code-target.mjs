/* @layer tooling-scripts @kind logic */
const isCodeTarget = (target) => typeof target === 'string' && /\.tsx?$/.test(target);

export { isCodeTarget };
