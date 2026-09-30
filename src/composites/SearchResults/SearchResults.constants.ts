/* @layer renderer-components @kind data */
import type { SearchResultsGroup, SearchResultsHit, SearchResultsJump } from './SearchResults.type';

const IDLE_MESSAGE = 'Type to search.';
const NO_HITS: readonly SearchResultsHit[] = [];
const NO_JUMPS: readonly SearchResultsJump[] = [];
const NO_GROUPS: readonly SearchResultsGroup[] = [];

export { IDLE_MESSAGE, NO_GROUPS, NO_HITS, NO_JUMPS };
