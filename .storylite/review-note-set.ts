/* @layer root-config @kind logic */
import { readNotes } from './review-notes-read';
import { writeNotes } from './review-notes-write';
import type { ReviewNotes } from './review.type';

const setNote = (root: string, title: string, text: string): ReviewNotes => {
  const notes = readNotes(root);
  const trimmed = text.trim();
  if (trimmed) notes[title] = { text: trimmed, at: new Date().toISOString() };
  else delete notes[title];
  writeNotes(root, notes);
  return notes;
};

export { setNote };
