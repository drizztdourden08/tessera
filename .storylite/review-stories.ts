/* @layer root-config @kind logic */
import fs from 'node:fs';
import path from 'node:path';
import { META_TITLE } from './review.constants';
import type { ReviewStory } from './review.type';
import { storyFiles } from './story-files';

const reviewStories = (root: string): ReviewStory[] =>
  storyFiles(path.join(root, 'stories')).flatMap((file) => {
    const title = META_TITLE.exec(fs.readFileSync(file, 'utf8'))?.[1];
    return title ? [{ title, file }] : [];
  });

export { reviewStories };
