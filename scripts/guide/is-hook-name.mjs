/* @layer tooling-scripts @kind logic */
const isHookName = (name) => /^use[A-Z]/.test(name);

export { isHookName };
