/* @layer root-config @kind logic */
import fs from 'node:fs';
import path from 'node:path';
import { reviewStore } from './review-store';
import { REVIEW_FILE } from './review.constants';
import type { ReviewRegistry } from './review.type';

const writeRegistry = (root: string, registry: ReviewRegistry): void => {
  const file = path.join(reviewStore(root), REVIEW_FILE);
  const text = `${JSON.stringify(registry, null, 2)}\n`;
  if (!fs.existsSync(file) || fs.readFileSync(file, 'utf8') !== text) fs.writeFileSync(file, text);
};

export { writeRegistry };
