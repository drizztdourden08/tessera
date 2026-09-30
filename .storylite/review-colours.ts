/* @layer root-config @kind logic */
import { reviewPages } from './review-pages';
import { syncRegistry } from './review-registry';
import { writeRegistry } from './review-write';
import { REVIEW_RANK as RANK } from './review.constants';
import type { ReviewColour, ReviewEntry, ReviewState } from './review.type';

const pageColour = (entry: ReviewEntry | undefined, hash: string): ReviewColour => {
  if (!entry || entry.status === 'new') return 'red';
  if (entry.hash !== hash) return 'yellow';
  return entry.status === 'ok' ? 'green' : 'red';
};

const reviewState = (root: string): ReviewState => {
  const pages = reviewPages(root);
  const registry = syncRegistry(root, pages);
  writeRegistry(root, registry);
  const hashes = new Map(pages.map((page) => [page.title, page.hash]));
  const state: ReviewState = { pages: {}, groups: {} };
  for (const [folder, entries] of Object.entries(registry)) {
    for (const [name, entry] of Object.entries(entries)) {
      const colour = pageColour(entry, hashes.get(`${folder}/${name}`) ?? '');
      const group = state.groups[folder];
      state.pages[`${folder}/${name}`] = colour;
      state.groups[folder] = group && RANK[group] >= RANK[colour] ? group : colour;
    }
  }
  return state;
};

export { reviewState };
