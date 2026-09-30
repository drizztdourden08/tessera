/* @layer root-config @kind logic */
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { pageFiles } from './review-files';
import { META_TITLE } from './review.constants';
import type { ReviewPage } from './review.type';
import { storyFiles } from './story-files';

const hashFiles = (root: string, files: readonly string[]): string => {
  const hash = crypto.createHash('sha1');
  for (const file of files) {
    hash.update(path.relative(root, file).split(path.sep).join('/'));
    hash.update(fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n'));
  }
  return hash.digest('hex').slice(0, 16);
};

const reviewPages = (root: string): ReviewPage[] =>
  storyFiles(path.join(root, 'stories')).flatMap((file) => {
    const title = META_TITLE.exec(fs.readFileSync(file, 'utf8'))?.[1];
    return title ? [{ title, hash: hashFiles(root, pageFiles(root, file)) }] : [];
  });

export { reviewPages };
