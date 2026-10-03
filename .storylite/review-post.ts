/* @layer root-config @kind logic */
import { reviewState } from './review-colours';
import { setNote } from './review-note-set';
import { reviewPages } from './review-pages';
import { reviewRequest } from './review-request';
import { setReview } from './review-set';
import { reviewStories } from './review-stories';
import type { ReviewPostKind, ReviewReply } from './review.type';

const parse = (raw: string): unknown => {
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return undefined;
  }
};

const reviewPost = (root: string, kind: ReviewPostKind, raw: string): ReviewReply => {
  const request = reviewRequest(kind, parse(raw), reviewStories(root).map((story) => story.title));
  if ('code' in request) return request;
  const pages = reviewPages(root);
  if (request.kind === 'set') setReview(root, request.status, (all) => all.filter((page) => page.title === request.title), pages);
  else setNote(root, request.title, request.text);
  return { code: 200, state: reviewState(root, pages) };
};

export { reviewPost };
