/* @layer tooling-scripts @kind logic */
import { existsSync, readFileSync } from 'node:fs';

const comparePartsModules = (root, files) => Object.entries(files)
  .filter(([path, content]) => (existsSync(`${root}/${path}`) ? readFileSync(`${root}/${path}`, 'utf8').replace(/\r\n/g, '\n') : undefined) !== content)
  .map(([path]) => ({ kind: 'parts-module', message: `${path} does not list the parts of the app; run tessera guide to write it`, coverage: false }));

export { comparePartsModules };
