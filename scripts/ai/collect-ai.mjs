/* @layer tooling-scripts @kind logic */
import { readFileSync } from 'node:fs';
import { TREE_MODULE } from './ai.constants.mjs';
import { createAiProgram } from './ai-program.mjs';
import { checkCoverage } from './check-coverage.mjs';
import { checkExamples } from './check-examples.mjs';
import { checkUsage } from './check-usage.mjs';
import { componentFacts } from './component-facts.mjs';
import { findComponents } from './find-components.mjs';
import { galleryPages } from './gallery-pages.mjs';
import { loadModule } from './load-module.mjs';
import { readUsage } from './read-usage.mjs';
import { publicExports } from './public-exports.mjs';
import { slashed } from './slashed.mjs';
import { treeLeaves } from './tree-leaves.mjs';
import { usageSources } from './usage-sources.mjs';

const isComponentName = (name) => /^[A-Z]/.test(name) && name !== name.toUpperCase();

const withUsage = async (root, component, file) => {
  if (!file) return { component };
  const { usage, error } = await readUsage(root, file);
  const problem = error && { kind: 'unreadable-usage', name: component.name, message: error, coverage: false };
  return { component: { ...component, usageSource: file, usage }, problem };
};

const loadUsages = async (root, components, usageDir) => {
  const { byName, stray } = usageSources(root, components, usageDir);
  const loaded = await Promise.all(components.map((c) => withUsage(root, c, byName.get(c.name))));
  const strays = stray.map(({ file, name }) => ({ kind: 'unknown-usage', name, message: `${file} matches no component folder`, coverage: false }));
  return { components: loaded.map((entry) => entry.component), strays: [...strays, ...loaded.flatMap((entry) => entry.problem ?? [])] };
};

const examplesOf = (components) =>
  Object.fromEntries(components.filter((c) => typeof c.usage?.example === 'string').map((c) => [c.name, c.usage.example]));

const programFor = (root, manifest, components) => {
  const entries = Object.values(manifest.exports).filter((target) => /\.tsx?$/.test(target)).map((target) => target.slice(2));
  const files = components.filter((c) => c.usage).map((c) => c.file);
  return createAiProgram(root, { entries: [...new Set([...entries, ...files])], examples: examplesOf(components) });
};

const usageFindings = (components, context) =>
  components.filter((c) => c.usage).flatMap((c) => checkUsage(c.name, c.usage, { ...context, currentHash: c.propsHash }));

const collectAi = async (rootDir, { usageDir } = {}) => {
  const root = slashed(rootDir);
  const manifest = JSON.parse(readFileSync(`${root}/package.json`, 'utf8'));
  const tree = (await loadModule(root, TREE_MODULE.slice(1))).DECISION_TREE;
  const leaves = treeLeaves(tree);
  const { components: found, strays } = await loadUsages(root, findComponents(root), usageDir);
  const program = programFor(root, manifest, found);
  const exports = publicExports(program, root, manifest);
  const context = { program, root, exports, gallery: galleryPages(root) };
  const components = found.map((component) => componentFacts(context, component));
  const specifiers = new Set([...exports.values()].flatMap((entry) => entry.specifiers));
  const componentNames = new Set([...exports.keys()].filter(isComponentName));
  const findings = [
    ...strays,
    ...usageFindings(components, { componentNames, leafKeys: new Set(leaves.map((leaf) => JSON.stringify(leaf))) }),
    ...checkExamples(program, manifest.name, specifiers),
    ...checkCoverage(components, leaves),
  ];
  return { packageName: manifest.name, specifiers: [...specifiers].sort(), tree, leaves, components, findings };
};

export { collectAi };
