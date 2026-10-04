/* @layer tooling-scripts @kind logic */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { GUIDE_DIR, COMPONENTS_DIR } from './guide.constants.mjs';

const onDisk = (root) => {
  const listed = (dir) => (existsSync(`${root}/${dir}`) ? readdirSync(`${root}/${dir}`, { withFileTypes: true }) : []);
  return [
    ...listed(GUIDE_DIR).filter((entry) => entry.isFile()).map((entry) => `${GUIDE_DIR}/${entry.name}`),
    ...listed(COMPONENTS_DIR).filter((entry) => entry.isFile()).map((entry) => `${COMPONENTS_DIR}/${entry.name}`),
  ];
};

const drift = (message) => ({ kind: 'drift', message, coverage: false });

const compareGuide = (root, files) => {
  const committed = (path) => (existsSync(`${root}/${path}`) ? readFileSync(`${root}/${path}`, 'utf8').replace(/\r\n/g, '\n') : undefined);
  const changed = Object.entries(files).filter(([path, content]) => committed(path) !== content).map(([path]) => drift(`${path} is not what pnpm guide writes`));
  const extra = onDisk(root).filter((path) => !(path in files)).map((path) => drift(`${path} is no longer written by pnpm guide`));
  return [...changed, ...extra];
};

export { compareGuide };
