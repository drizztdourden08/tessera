/* @layer root-config @kind data */
import type { ReviewColour, ReviewStatus } from './review.type';

const REVIEW_RANK: Record<ReviewColour, number> = { green: 0, yellow: 1, red: 2 };

const REVIEW_STATUSES: readonly ReviewStatus[] = ['new', 'seen', 'ok'];

const REVIEW_FILE = '.storylite/review.json';

const REVIEW_NOTES_FILE = '.storylite/review-notes.json';

const REVIEW_ROUTE = '/__review';

const REVIEW_SET_ROUTE = '/__review/set';

const REVIEW_NOTE_ROUTE = '/__review/note';

const REVIEW_EVENT = 'tessera:review';

const REVIEW_MODULE = '/.storylite/review-colours.ts';

const REVIEW_POST_MODULE = '/.storylite/review-post.ts';

const REVIEW_EXTENSIONS = ['.ts', '.tsx', '.css'] as const;

const REVIEW_SKIP = ['_template'] as const;

const SOURCE_TIERS: readonly string[] = ['primitives', 'composites', 'brand'];

const REVIEW_CACHE_MS = 2000;

const REVIEW_BODY_LIMIT = 16_384;

const REVIEW_NOTE_LIMIT = 4000;

const RELATIVE_IMPORT = /(?:from|import)\s+'(\.{1,2}\/[^']+)'/g;

const META_TITLE = /const meta = \{[^]*?\btitle: '([^']+)'/;

export {
  META_TITLE, RELATIVE_IMPORT, REVIEW_BODY_LIMIT, REVIEW_CACHE_MS, REVIEW_EVENT, REVIEW_EXTENSIONS, REVIEW_FILE, REVIEW_MODULE, REVIEW_NOTE_LIMIT,
  REVIEW_NOTE_ROUTE, REVIEW_NOTES_FILE, REVIEW_POST_MODULE, REVIEW_RANK, REVIEW_ROUTE, REVIEW_SET_ROUTE, REVIEW_SKIP, REVIEW_STATUSES, SOURCE_TIERS,
};
