/* @layer tooling-scripts @kind logic */
import { isCodeTarget } from './is-code-target.mjs';

const codeWildcards = (manifest) =>
  Object.entries(manifest.exports ?? {}).filter(([key, target]) => isCodeTarget(target) && key.includes('*'));

export { codeWildcards };
