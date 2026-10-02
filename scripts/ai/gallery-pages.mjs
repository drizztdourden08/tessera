/* @layer tooling-scripts @kind logic */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { STORIES_DIR } from './ai.constants.mjs';

const META_TITLE = /const meta = \{[^]*?\btitle: '([^']+)'/;
const STORY_SUFFIX = '.stories.tsx';

const storyFiles = (root) =>
  readdirSync(`${root}/${STORIES_DIR}`, { recursive: true })
    .map((file) => String(file).split('\\').join('/'))
    .filter((file) => file.endsWith(STORY_SUFFIX))
    .sort();

const galleryPages = (root) => {
  const pages = new Map();
  if (!existsSync(`${root}/${STORIES_DIR}`)) return pages;
  for (const file of storyFiles(root)) {
    const name = file.slice(file.lastIndexOf('/') + 1, -STORY_SUFFIX.length);
    const title = META_TITLE.exec(readFileSync(`${root}/${STORIES_DIR}/${file}`, 'utf8'))?.[1];
    if (!title || pages.has(name)) continue;
    const route = `#/story/${file.slice(0, -STORY_SUFFIX.length).split('/').join('-').toLowerCase()}--overview`;
    pages.set(name, { title, route, file: `${STORIES_DIR}/${file}` });
  }
  return pages;
};

export { galleryPages };
