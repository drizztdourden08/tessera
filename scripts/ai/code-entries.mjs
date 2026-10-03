/* @layer tooling-scripts @kind logic */
const codeEntries = (manifest) =>
  Object.entries(manifest.exports).filter(([, target]) => typeof target === 'string' && /\.tsx?$/.test(target));

export { codeEntries };
