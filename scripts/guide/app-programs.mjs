/* @layer tooling-scripts @kind logic */
import { PACKAGE_NAME } from '../cli/new.constants.mjs';
import { createGuideProgram } from './guide-program.mjs';
import { appExamples } from './app-examples.mjs';
import { codeEntries } from './code-entries.mjs';
import { nearestTsconfig } from './nearest-tsconfig.mjs';
import { readManifest } from '../cli/read-manifest.mjs';
import { TESSERA_ROOT } from './tessera-root.constants.mjs';

const isAmbient = (file) => file.endsWith('.d.ts') && !file.includes('/node_modules/');

const tesseraEntries = () => codeEntries(readManifest(TESSERA_ROOT)).map(([, target]) => `${TESSERA_ROOT}/${target.slice(2)}`);

const groupByTsconfig = (root, components) => {
  const groups = new Map();
  for (const c of components) {
    const tsconfig = c.scope.guide.tsconfig ?? nearestTsconfig(`${root}/${c.folder}`, root);
    groups.set(tsconfig, [...(groups.get(tsconfig) ?? []), c]);
  }
  return groups;
};

const noTsconfig = (members) => members.map((c) => ({
  kind: 'tsconfig', name: c.name, message: `no tsconfig.json in ${c.folder} or above it; set guide.tsconfig in tessera.config.json`, coverage: false,
}));

const appPrograms = (root, components) => {
  const byComponent = new Map();
  const programs = [];
  const problems = [];
  for (const [tsconfig, members] of groupByTsconfig(root, components.filter((c) => c.usage))) {
    if (!tsconfig) {
      problems.push(...noTsconfig(members));
      continue;
    }
    const { examples, paths } = appExamples(root, members);
    const rootNames = [...members.map((c) => `${root}/${c.file}`), ...tesseraEntries()];
    const program = createGuideProgram({ tsconfig, rootNames, examples, ambient: isAmbient, paths });
    programs.push(program);
    for (const c of members) byComponent.set(c.folder, program);
  }
  return { byComponent, programs, problems, tessera: { root: TESSERA_ROOT, manifest: readManifest(TESSERA_ROOT), name: PACKAGE_NAME } };
};

export { appPrograms };
