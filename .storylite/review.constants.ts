/* @layer root-config @kind data */
import type { ReviewColour } from './review.type';

const REVIEW_RANK: Record<ReviewColour, number> = { green: 0, yellow: 1, red: 2 };

const REVIEW_FILE = '.storylite/review.json';

const REVIEW_ROUTE = '/__review';

const REVIEW_MODULE = '/.storylite/review-colours.ts';

const REVIEW_EXTENSIONS = ['.ts', '.tsx', '.css'] as const;

const REVIEW_SKIP = ['_template'] as const;

const SOURCE_TIERS: readonly string[] = ['primitives', 'composites', 'brand'];

const REVIEW_CACHE_MS = 2000;

const RELATIVE_IMPORT = /(?:from|import)\s+'(\.{1,2}\/[^']+)'/g;

const META_TITLE = /const meta = \{[^]*?\btitle: '([^']+)'/;

export { META_TITLE, RELATIVE_IMPORT, REVIEW_CACHE_MS, REVIEW_MODULE, REVIEW_RANK, REVIEW_EXTENSIONS, REVIEW_FILE, REVIEW_ROUTE, REVIEW_SKIP, SOURCE_TIERS };
