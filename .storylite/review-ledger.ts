/* @layer root-config @kind logic */
import fs from 'node:fs';
import path from 'node:path';
import { REVIEW_FILE } from './review.constants';
import type { ReviewLedger } from './review.type';

const readLedger = (root: string): ReviewLedger => {
  try {
    return JSON.parse(fs.readFileSync(path.join(root, REVIEW_FILE), 'utf8')) as ReviewLedger;
  } catch {
    return {};
  }
};

export { readLedger };
