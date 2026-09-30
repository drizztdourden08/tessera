/* @layer root-config @kind logic */
import fs from 'node:fs';
import path from 'node:path';
import { catalogueTitles } from './catalogue-titles';
import { splitTitle } from './review-split-title';
import { REVIEW_FILE } from './review.constants';
import type { ReviewEntry, ReviewPage, ReviewRegistry } from './review.type';

const readRegistry = (root: string): ReviewRegistry => {
  try {
    return JSON.parse(fs.readFileSync(path.join(root, REVIEW_FILE), 'utf8')) as ReviewRegistry;
  } catch {
    return {};
  }
};

const entryOf = (registry: ReviewRegistry, title: string): ReviewEntry | undefined => {
  const [folder, page] = splitTitle(title);
  return registry[folder]?.[page];
};

const syncRegistry = (root: string, pages: readonly ReviewPage[]): ReviewRegistry => {
  const current = readRegistry(root);
  const order = catalogueTitles();
  const rank = (title: string): number => (order.includes(title) ? order.indexOf(title) : order.length);
  const sorted = [...pages].sort((a, b) => rank(a.title) - rank(b.title) || a.title.localeCompare(b.title));
  const next: ReviewRegistry = {};
  const today = new Date().toISOString().slice(0, 10);
  for (const { title, hash } of sorted) {
    const [folder, page] = splitTitle(title);
    const entry = entryOf(current, title) ?? { status: 'new' };
    const stamped = entry.status !== 'new' && !entry.hash ? { ...entry, hash, at: today } : entry;
    next[folder] = { ...next[folder], [page]: stamped };
  }
  return next;
};

export { syncRegistry };
