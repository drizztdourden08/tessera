/* @layer tooling-scripts @kind logic */
const PLAIN_KEY = /^[A-Za-z_$][\w$]*$/;

const keyPath = (path, key) => {
  if (!PLAIN_KEY.test(key)) return `${path}['${key}']`;
  return path ? `${path}.${key}` : key;
};

export { keyPath };
