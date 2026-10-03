/* @layer root-config @kind logic */
import fs from 'node:fs';
import path from 'node:path';
import { REVIEW_NOTES_FILE } from './review.constants';
import type { ReviewNotes } from './review.type';

const writeNotes = (root: string, notes: ReviewNotes): void => {
  const file = path.join(root, REVIEW_NOTES_FILE);
  const titles = Object.keys(notes).sort();
  if (titles.length === 0) {
    fs.rmSync(file, { force: true });
    return;
  }
  const sorted = Object.fromEntries(titles.map((title) => [title, notes[title]]));
  fs.writeFileSync(file, `${JSON.stringify(sorted, null, 2)}\n`);
};

export { writeNotes };
