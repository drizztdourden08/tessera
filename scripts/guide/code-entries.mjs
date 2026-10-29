/* @layer tooling-scripts @kind logic */
import { isCodeTarget } from './is-code-target.mjs';

const codeEntries = (manifest) =>
  Object.entries(manifest.exports).filter(([, target]) => isCodeTarget(target) && !target.includes('*'));

export { codeEntries };
