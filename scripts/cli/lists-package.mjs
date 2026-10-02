/* @layer tooling-scripts @kind logic */
const listsPackage = (manifest, name) =>
  [manifest.dependencies, manifest.devDependencies, manifest.peerDependencies].some((deps) => Boolean(deps?.[name]));

export { listsPackage };
