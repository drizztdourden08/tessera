/* @layer tooling-scripts @kind logic */
import { listsPackage } from './lists-package.mjs';
import { nearestManifest } from './nearest-manifest.mjs';
import { STORYLITE } from './new.constants.mjs';
import { readManifest } from './read-manifest.mjs';

const hasStoryLite = (project) =>
  [project.manifest, readManifest(project.root), readManifest(nearestManifest(project.config.stories))].some((manifest) => listsPackage(manifest, STORYLITE));

export { hasStoryLite };
