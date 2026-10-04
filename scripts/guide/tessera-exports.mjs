/* @layer tooling-scripts @kind logic */
import { isComponentName } from './is-component-name.mjs';
import { publicExports } from './public-exports.mjs';

const tesseraExports = ({ programs, tessera }) => {
  if (programs.length === 0) return { names: new Set(), specifiers: new Set(), byName: new Map() };
  const byName = publicExports(programs[0], tessera.root, tessera.manifest);
  return {
    byName,
    names: new Set([...byName.keys()].filter(isComponentName)),
    specifiers: new Set([...byName.values()].flatMap((entry) => entry.specifiers)),
  };
};

export { tesseraExports };
