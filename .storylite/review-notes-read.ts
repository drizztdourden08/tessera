/* @layer root-config @kind logic */
import fs from 'node:fs';
import path from 'node:path';
import { REVIEW_NOTES_FILE } from './review.constants';
import type { ReviewNote, ReviewNotes } from './review.type';

const isNote = (value: unknown): value is ReviewNote =>
  typeof value === 'object' && value !== null && typeof (value as ReviewNote).text === 'string' && typeof (value as ReviewNote).at === 'string';

const readNotes = (root: string): ReviewNotes => {
  const file = path.join(root, REVIEW_NOTES_FILE);
  if (!fs.existsSync(file)) return {};
  try {
    const parsed = JSON.parse(fs.readFileSync(file, 'utf8')) as Record<string, unknown>;
    return Object.fromEntries(Object.entries(parsed).filter((pair): pair is [string, ReviewNote] => isNote(pair[1])));
  } catch {
    return {};
  }
};

export { readNotes };
