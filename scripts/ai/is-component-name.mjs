/* @layer tooling-scripts @kind logic */
const isComponentName = (name) => /^[A-Z]/.test(name) && name !== name.toUpperCase();

export { isComponentName };
