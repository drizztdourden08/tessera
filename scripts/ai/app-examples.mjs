/* @layer tooling-scripts @kind logic */
import { nearestManifest } from '../cli/nearest-manifest.mjs';
import { exampleHome } from './example-home.mjs';
import { packageEntry } from './package-entry.mjs';

const homeOf = (root, c) => exampleHome(c.scope, { kindDir: c.kindDir, folder: `${root}/${c.folder}` });

const appExamples = (root, members) => {
  const examples = [];
  const paths = {};
  for (const c of members) {
    const home = homeOf(root, c);
    if (home.from) paths[home.from] = [packageEntry(nearestManifest(`${root}/${c.folder}`))];
    if (typeof c.usage?.example === 'string') examples.push({ name: c.name, file: `${home.dir}/${c.name}.example.tsx`, text: c.usage.example });
  }
  return { examples, paths };
};

export { appExamples };
