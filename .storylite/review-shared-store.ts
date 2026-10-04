/* @layer root-config @kind logic */
import { REVIEW_STORE_ENV } from './review.constants';

const sharedStore = (): string | undefined => {
  const dir = process.env[REVIEW_STORE_ENV];
  return dir === '' ? undefined : dir;
};

export { sharedStore };
