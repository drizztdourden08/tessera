/* @layer tooling-scripts @kind logic */
const exportTarget = (target) => (typeof target === 'string' ? target : target?.types ?? target?.import ?? target?.default);

export { exportTarget };
