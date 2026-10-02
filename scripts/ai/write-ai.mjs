/* @layer tooling-scripts @kind logic */
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { COMPONENTS_DIR } from './ai.constants.mjs';

const writeAi = (root, files) => {
  mkdirSync(`${root}/${COMPONENTS_DIR}`, { recursive: true });
  for (const [path, content] of Object.entries(files)) writeFileSync(`${root}/${path}`, content);
  const stale = readdirSync(`${root}/${COMPONENTS_DIR}`).filter((name) => !(`${COMPONENTS_DIR}/${name}` in files));
  for (const name of stale) rmSync(`${root}/${COMPONENTS_DIR}/${name}`);
  if (Object.keys(files).every((path) => !path.startsWith(`${COMPONENTS_DIR}/`)) && existsSync(`${root}/${COMPONENTS_DIR}`)) rmSync(`${root}/${COMPONENTS_DIR}`, { recursive: true });
  return stale;
};

export { writeAi };
