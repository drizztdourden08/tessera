/* @layer tooling-scripts @kind logic */
import { absolutePath } from '../config/absolute-path.mjs';
import { readConfigFile } from '../config/read-config-file.mjs';

const storiesConfigured = ({ file, root, app }) => {
  if (file === undefined) return false;
  const raw = readConfigFile(file);
  const appSettings = Object.entries(raw.apps ?? {}).find(([key]) => absolutePath(root, key) === app)?.[1];
  return raw.stories !== undefined || appSettings?.stories !== undefined;
};

export { storiesConfigured };
