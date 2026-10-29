/* @layer tooling-scripts @kind logic */
import { isComponentName } from './is-component-name.mjs';
import { publicExports } from './public-exports.mjs';
import { subpathPatterns } from './subpath-patterns.mjs';

const tesseraExports = ({ programs, tessera }) => {
  if (programs.length === 0) return { names: new Set(), specifiers: new Set(), patterns: [], byName: new Map() };
  const byName = publicExports(programs[0], tessera.root, tessera.manifest);
  return {
    byName,
    names: new Set([...byName.keys()].filter(isComponentName)),
    specifiers: new Set([...byName.values()].flatMap((entry) => entry.specifiers)),
    patterns: subpathPatterns(tessera.manifest),
  };
};

export { tesseraExports };
