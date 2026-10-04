/* @layer tooling-scripts @kind logic */
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { COMPONENTS_DIR } from './guide.constants.mjs';

const writeGuide = (root, files, componentsDir = COMPONENTS_DIR) => {
  mkdirSync(`${root}/${componentsDir}`, { recursive: true });
  for (const [path, content] of Object.entries(files)) writeFileSync(`${root}/${path}`, content);
  const stale = readdirSync(`${root}/${componentsDir}`).filter((name) => !(`${componentsDir}/${name}` in files));
  for (const name of stale) rmSync(`${root}/${componentsDir}/${name}`);
  if (Object.keys(files).every((path) => !path.startsWith(`${componentsDir}/`)) && existsSync(`${root}/${componentsDir}`)) rmSync(`${root}/${componentsDir}`, { recursive: true });
  return stale;
};

export { writeGuide };
