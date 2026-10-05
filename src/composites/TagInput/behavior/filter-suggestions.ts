/* @layer renderer-components @kind logic */
import { matchesText } from '../../../data/text/matches-text';
import type { FilterSuggestionsParams } from './filter-suggestions.type';

const filterSuggestions = (params: FilterSuggestionsParams): readonly string[] => {
  const { suggestions, query, selected, limit } = params;
  const taken = new Set(selected);
  const hits = suggestions.filter((tag) => !taken.has(tag) && matchesText(tag, query));

  return limit != null && limit >= 0 ? hits.slice(0, limit) : hits;
};

export { filterSuggestions };
