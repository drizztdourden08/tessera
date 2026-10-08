/* @layer tooling-scripts @kind logic */
import { folderKey } from './folder-key.mjs';

const uniqueFolders = (folders) => {
  const byKey = new Map();
  for (const folder of folders) if (!byKey.has(folderKey(folder))) byKey.set(folderKey(folder), folder);
  return [...byKey.values()];
};

export { uniqueFolders };
