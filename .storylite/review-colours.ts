/* @layer root-config @kind logic */
import { readNotes } from './review-notes-read';
import { reviewPages } from './review-pages';
import { syncRegistry } from './review-registry';
import { writeRegistry } from './review-write';
import { REVIEW_RANK as RANK } from './review.constants';
import type { ReviewColour, ReviewEntry, ReviewPage, ReviewState } from './review.type';

const pageColour = (entry: ReviewEntry | undefined, hash: string): ReviewColour => {
  if (!entry || entry.status === 'new') return 'red';
  if (entry.status === 'ok') return 'green';
  return entry.hash === hash ? 'red' : 'yellow';
};

const reviewState = (root: string, pages: readonly ReviewPage[] = reviewPages(root)): ReviewState => {
  const registry = syncRegistry(root, pages);
  writeRegistry(root, registry);
  const hashes = new Map(pages.map((page) => [page.title, page.hash]));
  const state: ReviewState = { pages: {}, groups: {}, marks: {}, notes: readNotes(root) };
  for (const [folder, entries] of Object.entries(registry)) {
    for (const [name, entry] of Object.entries(entries)) {
      const title = `${folder}/${name}`;
      const colour = pageColour(entry, hashes.get(title) ?? '');
      const group = state.groups[folder];
      state.pages[title] = colour;
      state.marks[title] = { status: entry.status, changed: entry.status !== 'new' && entry.hash !== hashes.get(title) };
      state.groups[folder] = group && RANK[group] >= RANK[colour] ? group : colour;
    }
  }
  return state;
};

export { reviewState };
