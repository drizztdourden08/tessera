/* @layer tooling-scripts @kind logic */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const writePartsModules = (root, files) => {
  for (const [path, content] of Object.entries(files)) {
    mkdirSync(dirname(`${root}/${path}`), { recursive: true });
    writeFileSync(`${root}/${path}`, content);
  }
};

export { writePartsModules };
