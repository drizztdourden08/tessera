/* @layer tooling-scripts @kind logic */
import { absolutePath } from '../config/absolute-path.mjs';
import { listsPackage } from './lists-package.mjs';
import { nearestManifest } from './nearest-manifest.mjs';
import { STORYLITE } from './new.constants.mjs';
import { readManifest } from './read-manifest.mjs';
import { storiesConfigured } from './stories-configured.mjs';

const listsStoryLite = (dir) => listsPackage(readManifest(dir), STORYLITE);

const storyPlace = ({ root, config }, folder) => {
  const partPackage = nearestManifest(absolutePath(root, folder));
  const configured = storiesConfigured(config);
  const dir = configured ? config.stories : absolutePath(partPackage ?? root, 'stories');
  const story = listsStoryLite(partPackage) || (configured && [root, nearestManifest(config.stories)].some(listsStoryLite));
  return { dir, story };
};

export { storyPlace };
