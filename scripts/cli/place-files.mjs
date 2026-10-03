/* @layer tooling-scripts @kind logic */
import { posix, relative } from 'node:path';
import { posixPath } from '../config/posix-path.mjs';
import { exampleImport } from './example-import.mjs';
import { partFolder } from './part-folder.mjs';
import { storyPlace } from './story-place.mjs';

const placeFiles = (project, { kind, name }, into) => {
  const part = partFolder(project, kind, into);
  if (part.problem) return part;
  const fromRoot = (path) => posixPath(relative(project.root, path));
  const folder = posix.join(part.dir, name);
  const stories = storyPlace(project, folder);
  const place = {
    kindDir: part.dir,
    folder,
    storyDir: posix.join(fromRoot(stories.dir), `${kind}s`),
    story: stories.story,
    primitivesDir: fromRoot(project.config.parts.primitives[0]),
  };
  return { ...place, exampleImport: exampleImport(project, place) };
};

export { placeFiles };
