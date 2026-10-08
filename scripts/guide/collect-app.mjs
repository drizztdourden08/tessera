/* @layer tooling-scripts @kind logic */
import { relative } from 'node:path';
import { posixPath } from '../config/posix-path.mjs';
import { PACKAGE_NAME } from '../cli/new.constants.mjs';
import { kindDirs } from '../standards/kind-dirs.mjs';
import { appPrograms } from './app-programs.mjs';
import { appScopes } from './app-scopes.mjs';
import { appTree } from './app-tree.mjs';
import { appWords } from './app-words.mjs';
import { checkCoverage } from './check-coverage.mjs';
import { checkExamples } from './check-examples.mjs';
import { componentFacts } from './component-facts.mjs';
import { duplicateParts } from './duplicate-parts.mjs';
import { exampleHome } from './example-home.mjs';
import { findAppParts } from './find-app-parts.mjs';
import { leafKeys } from './leaf-keys.mjs';
import { loadUsages } from './load-usages.mjs';
import { placeholderFields } from './placeholder-fields.mjs';
import { tesseraExports } from './tessera-exports.mjs';
import { treeLeaves } from './tree-leaves.mjs';
import { uniqueFolders } from './unique-folders.mjs';
import { usageFindings } from './usage-findings.mjs';

const NONE = new Map();

const factsOf = (root, programs, c) => {
  const program = programs.byComponent.get(c.folder);
  const facts = componentFacts({ program, root, exports: NONE, gallery: NONE }, c);
  const from = exampleHome(c.scope, { kindDir: c.kindDir, folder: `${root}/${c.folder}` }).from;
  const page = facts.page && Boolean(program) && placeholderFields(c.name, c.usage).length === 0;
  return { ...facts, page, imports: from ? [from] : [] };
};

const placeLeaves = (findings, trees) => {
  const sourceOf = new Map(trees.appLeaves.map((leaf, index) => [leaf.join(' > '), trees.leafSources[index]]));
  return findings.map((f) => (f.kind === 'unreached-leaf' ? { ...f, at: sourceOf.get(f.message) } : f));
};

const collectApp = async (config) => {
  const { root } = config;
  const scopes = appScopes(config);
  const dirs = uniqueFolders(scopes.flatMap(kindDirs).map((entry) => posixPath(relative(root, entry.dir))));
  const { components: found, strays } = await loadUsages(root, findAppParts(root, scopes), { dirs });
  const trees = appTree(root, scopes);
  const programs = appPrograms(root, found);
  const components = found.map((c) => factsOf(root, programs, c));
  const tessera = tesseraExports(programs);
  const context = { componentNames: new Set([...tessera.names, ...components.map((c) => c.name)]), leafKeys: leafKeys(treeLeaves(trees.tree)), words: appWords(trees.sources) };
  const findings = [
    ...duplicateParts(found), ...strays, ...trees.problems, ...programs.problems,
    ...usageFindings(components, context),
    ...programs.programs.flatMap((program) => checkExamples(program, { packageName: PACKAGE_NAME, specifiers: tessera.specifiers, relative: true })),
    ...placeLeaves(checkCoverage(components, trees.appLeaves), trees),
  ];
  return { config, scopes, tessera, tree: trees.tree, leaves: trees.appLeaves, sources: trees.sources, components, findings };
};

export { collectApp };
