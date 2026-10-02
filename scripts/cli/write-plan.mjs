/* @layer tooling-scripts @kind logic */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const writePlan = (root, plan) => {
  for (const { path, content } of [...plan.files, ...plan.edits]) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), content);
  }
};

export { writePlan };
