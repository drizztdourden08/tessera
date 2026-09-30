/* @layer root-config @kind logic */
import { readLedger } from './review-ledger';
import { reviewPages } from './review-pages';
import type { ReviewColour } from './review.type';

const reviewColours = (root: string): Record<string, ReviewColour> => {
  const ledger = readLedger(root);
  const colours: Record<string, ReviewColour> = {};
  for (const page of reviewPages(root)) {
    const entry = ledger[page.title];
    if (!entry) colours[page.title] = 'red';
    else if (entry.hash !== page.hash) colours[page.title] = 'yellow';
    else colours[page.title] = entry.mark === 'ok' ? 'green' : 'red';
  }
  return colours;
};

export { reviewColours };
