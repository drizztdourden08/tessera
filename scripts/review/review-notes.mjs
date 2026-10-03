/* @layer tooling-scripts @kind logic */
import { findPages } from './find-pages.mjs';

const USAGE = 'Usage: pnpm review notes | pnpm review notes clear <page>... | pnpm review notes clear --all';

const printNotes = (notes) => {
  const entries = Object.entries(notes);
  if (entries.length === 0) console.log('No notes.');
  for (const [title, note] of entries) {
    console.log(`${title}  (${note.at})`);
    for (const line of note.text.split('\n')) console.log(`  ${line}`);
  }
};

const reviewNotes = (root, { readNotes, writeNotes, setNote }, args) => {
  const [action, ...names] = args;
  const notes = readNotes(root);
  if (!action) return printNotes(notes);
  if (action !== 'clear' || names.length === 0) throw new Error(USAGE);
  if (names.includes('--all')) {
    writeNotes(root, {});
    return console.log(`cleared ${Object.keys(notes).length} notes`);
  }
  const titles = Object.keys(notes).map((title) => ({ title }));
  for (const { title } of findPages(titles, names)) {
    setNote(root, title, '');
    console.log(`cleared ${title}`);
  }
};

export { reviewNotes };
