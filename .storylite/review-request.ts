/* @layer root-config @kind logic */
import { REVIEW_NOTE_LIMIT, REVIEW_STATUSES } from './review.constants';
import type { ReviewPostKind, ReviewReply, ReviewRequest, ReviewStatus } from './review.type';

const reviewRequest = (kind: ReviewPostKind, body: unknown, titles: readonly string[]): ReviewRequest | ReviewReply => {
  if (typeof body !== 'object' || body === null || Array.isArray(body)) return { code: 400, error: 'Send a JSON object.' };
  const { title, status, text } = body as Record<string, unknown>;
  if (typeof title !== 'string' || !titles.includes(title)) return { code: 404, error: `No gallery page is titled ${JSON.stringify(title)}.` };
  if (kind === 'set') {
    return REVIEW_STATUSES.includes(status as ReviewStatus)
      ? { kind, title, status: status as ReviewStatus }
      : { code: 400, error: `status must be one of ${REVIEW_STATUSES.join(', ')}.` };
  }
  if (typeof text !== 'string') return { code: 400, error: 'text must be a string; an empty one deletes the note.' };
  if (text.length > REVIEW_NOTE_LIMIT) return { code: 413, error: `A note holds at most ${REVIEW_NOTE_LIMIT} characters.` };
  return { kind, title, text };
};

export { reviewRequest };
