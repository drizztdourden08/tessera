/* @layer renderer-components @kind data */
import type { SearchResultsGroup, SearchResultsHit, SearchResultsJump } from './SearchResults.type';

const NO_HITS: readonly SearchResultsHit[] = [];
const NO_JUMPS: readonly SearchResultsJump[] = [];
const NO_GROUPS: readonly SearchResultsGroup[] = [];
const IDLE_ICON_SIZE = 40;

export { IDLE_ICON_SIZE, NO_GROUPS, NO_HITS, NO_JUMPS };
