/* @layer root-config @kind logic */
import { sharedStore } from './review-shared-store';

const reviewStore = (root: string): string => sharedStore() ?? root;

export { reviewStore };
