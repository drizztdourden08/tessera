/* @layer renderer-components @kind logic */
import { normalizeTag } from './tag-values';
import type { FilterSuggestionsParams } from './filter-suggestions.type';

const matchesQuery = (tag: string, query: string): boolean =>
  tag.toLowerCase().includes(query.toLowerCase());

const filterSuggestions = (params: FilterSuggestionsParams): readonly string[] => {
  const { suggestions, query, selected, limit } = params;

  const needle = normalizeTag(query);
  const taken = new Set(selected);
  const hits = suggestions.filter(
    (tag) => !taken.has(tag) && (needle === '' || matchesQuery(tag, needle)),
  );

  return limit != null && limit >= 0 ? hits.slice(0, limit) : hits;
};

export { filterSuggestions };
