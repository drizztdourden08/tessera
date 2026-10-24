/* @layer tooling-scripts @kind logic */
import { readFileSync } from 'node:fs';
import { EXAMPLE_DIR, TESSERA_WORDS, TREE_MODULE } from './guide.constants.mjs';
import { createGuideProgram } from './guide-program.mjs';
import { checkCoverage } from './check-coverage.mjs';
import { checkExamples } from './check-examples.mjs';
import { componentFacts } from './component-facts.mjs';
import { findComponents } from './find-components.mjs';
import { galleryPages } from './gallery-pages.mjs';
import { findHookModules } from './find-hook-modules.mjs';
import { isComponentName } from './is-component-name.mjs';
import { isHookName } from './is-hook-name.mjs';
import { leafKeys } from './leaf-keys.mjs';
import { loadModule } from './load-module.mjs';
import { moduleFacts } from './module-facts.mjs';
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
  const { components: loaded, strays } = await loadUsages(root, [...findComponents(root), ...findHookModules(root)], { usageDir });
  const found = loaded.filter((entry) => entry.kind !== 'hooks');
  const program = programFor(root, manifest, loaded);
  const exports = publicExports(program, root, manifest);
  const context = { program, root, exports, gallery: galleryPages(root) };
  const components = found.map((component) => componentFacts(context, component));
  const modules = loaded.filter((entry) => entry.kind === 'hooks').map((entry) => moduleFacts(context, entry));
  const specifiers = new Set([...exports.values()].flatMap((entry) => entry.specifiers));
  const componentNames = new Set([...exports.keys()].filter((name) => isComponentName(name) || isHookName(name)));
  const findings = [
    ...strays,
    ...usageFindings([...components, ...modules], { componentNames, leafKeys: leafKeys(leaves), words: TESSERA_WORDS }),
    ...checkExamples(program, { packageName: manifest.name, specifiers }),
    ...checkCoverage(components, leaves),
  ];
  return { packageName: manifest.name, specifiers: [...specifiers].sort(), tree, leaves, components, modules, findings };
};

export { collectGuide };
