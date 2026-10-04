/* @layer tooling-scripts @kind logic */
import { exampleHome } from './example-home.mjs';

const homeOf = (root, c) => exampleHome(c.scope, { kindDir: c.kindDir, folder: `${root}/${c.folder}` });

const appExamples = (root, members) => {
  const examples = [];
  const paths = {};
  for (const c of members) {
    const home = homeOf(root, c);
    if (home.from) paths[home.from] = [home.entry];
    if (typeof c.usage?.example === 'string') examples.push({ name: c.name, file: `${home.dir}/${c.name}.example.tsx`, text: c.usage.example });
  }
  return { examples, paths };
};

export { appExamples };
