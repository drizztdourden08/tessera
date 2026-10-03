/* @layer root-config @kind logic */
import { reviewPages } from './review-pages';
import { syncRegistry } from './review-registry';
import { splitTitle } from './review-split-title';
import { writeRegistry } from './review-write';
import type { ReviewEntry, ReviewPage, ReviewStatus } from './review.type';

const setReview = (
  root: string,
  status: ReviewStatus,
  pick: (pages: readonly ReviewPage[]) => ReviewPage[],
  pages: readonly ReviewPage[] = reviewPages(root),
): ReviewPage[] => {
  const registry = syncRegistry(root, pages);
  const today = new Date().toISOString().slice(0, 10);
  const chosen = pick(pages);
  for (const page of chosen) {
    const [folder, name] = splitTitle(page.title);
    const entry: ReviewEntry = status === 'new' ? { status } : { status, hash: page.hash, at: today };
    registry[folder] = { ...registry[folder], [name]: entry };
  }
  writeRegistry(root, registry);
  return chosen;
};

export { setReview };
