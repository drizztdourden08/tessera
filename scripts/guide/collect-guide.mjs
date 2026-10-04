/* @layer tooling-scripts @kind logic */
import { readFileSync } from 'node:fs';
import { EXAMPLE_DIR, TESSERA_WORDS, TREE_MODULE } from './guide.constants.mjs';
import { createGuideProgram } from './guide-program.mjs';
import { checkCoverage } from './check-coverage.mjs';
import { checkExamples } from './check-examples.mjs';
import { componentFacts } from './component-facts.mjs';
import { findComponents } from './find-components.mjs';
import { galleryPages } from './gallery-pages.mjs';
import { isComponentName } from './is-component-name.mjs';
import { leafKeys } from './leaf-keys.mjs';
import { loadModule } from './load-module.mjs';
import { loadUsages } from './load-usages.mjs';
import { publicExports } from './public-exports.mjs';
import { slashed } from './slashed.mjs';
import { treeLeaves } from './tree-leaves.mjs';
import { usageFindings } from './usage-findings.mjs';

const examplesOf = (root, components) => components
  .filter((c) => typeof c.usage?.example === 'string')
  .map((c) => ({ name: c.name, file: `${root}/${EXAMPLE_DIR}/${c.name}.example.tsx`, text: c.usage.example }));

const programFor = (root, manifest, components) => {
  const entries = Object.values(manifest.exports).filter((target) => /\.tsx?$/.test(target)).map((target) => target.slice(2));
  const files = components.filter((c) => c.usage).map((c) => c.file);
  return createGuideProgram({
    tsconfig: `${root}/tsconfig.json`,
    rootNames: [...new Set([...entries, ...files])].map((file) => `${root}/${file}`),
    examples: examplesOf(root, components),
    ambient: (file) => file.startsWith(`${root}/types/`),
  });
};

const collectGuide = async (rootDir, { usageDir } = {}) => {
  const root = slashed(rootDir);
  const manifest = JSON.parse(readFileSync(`${root}/package.json`, 'utf8'));
  const tree = loadModule(root, TREE_MODULE.slice(1)).DECISION_TREE;
  const leaves = treeLeaves(tree);
  const { components: found, strays } = await loadUsages(root, findComponents(root), { usageDir });
  const program = programFor(root, manifest, found);
  const exports = publicExports(program, root, manifest);
  const context = { program, root, exports, gallery: galleryPages(root) };
  const components = found.map((component) => componentFacts(context, component));
  const specifiers = new Set([...exports.values()].flatMap((entry) => entry.specifiers));
  const componentNames = new Set([...exports.keys()].filter(isComponentName));
  const findings = [
    ...strays,
    ...usageFindings(components, { componentNames, leafKeys: leafKeys(leaves), words: TESSERA_WORDS }),
    ...checkExamples(program, { packageName: manifest.name, specifiers }),
    ...checkCoverage(components, leaves),
  ];
  return { packageName: manifest.name, specifiers: [...specifiers].sort(), tree, leaves, components, findings };
};

export { collectGuide };
