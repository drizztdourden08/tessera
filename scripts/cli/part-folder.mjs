/* @layer tooling-scripts @kind logic */
import { matchesGlob, relative, resolve } from 'node:path';
import { isGlob } from '../config/is-glob.mjs';
import { posixPath } from '../config/posix-path.mjs';

const fits = (entry, dir) => (isGlob(entry) ? matchesGlob(dir, entry) : relative(entry, dir) === '');

const pickInto = (entries, into, project) => {
  const candidates = [resolve(project.cwd, into), resolve(project.root, into)].map(posixPath);
  return candidates.find((dir) => entries.some((entry) => fits(entry, dir)));
};

const fromRoot = (project, path) => posixPath(relative(project.root, path));

const partFolder = (project, kind, into) => {
  const entries = project.config.parts[`${kind}s`];
  const dir = into === undefined ? entries[0] : pickInto(entries, into, project);
  const listed = entries.map((entry) => fromRoot(project, entry)).join(', ');
  if (dir === undefined) return { problem: `--into ${into} is not one of the ${kind} folders in tessera.config.json: ${listed}` };
  if (isGlob(dir)) return { problem: `the first ${kind} folder, ${fromRoot(project, dir)}, is a glob. Pass --into with the folder to write in` };
  return { dir: fromRoot(project, dir) };
};

export { partFolder };
